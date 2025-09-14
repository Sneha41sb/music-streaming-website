"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { Repeat } from "lucide-react";
import { MdOutlineQueueMusic } from "react-icons/md";
import styles from "./MusicPlayer.module.css";


export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayButton = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
  if (!audioRef.current) return;

  if (isMuted) {
    // unmute
    setIsMuted(false);
    setVolume(previousVolume || 50);
    audioRef.current.volume = (previousVolume || 50) / 100;
  } else {
    // mute
    setIsMuted(true);
    setPreviousVolume(volume);
    setVolume(0);
    audioRef.current.volume = 0;
  }
};

  // keep audio volume in sync with state
  useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume / 100;
  }
  if (volume > 0 && isMuted) {
    setIsMuted(false);
  }
}, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  // Format seconds → mm:ss
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white px-4 py-3 shadow-md z-50">
      <div className="max-w-8xl w-[95%] mx-auto flex items-center justify-between">
        <audio src="/Blue-Yung-Kai.mp3" ref={audioRef}></audio>

        {/* song details */}
       <div className="flex flex-col items-center">
  <Image
  src="/MP3 snoopy.jpeg"
  alt="cover-image"
  width={120}
  height={120}
  className={`w-28 h-28 rounded-full object-cover`}
  style={{
    animation: isPlaying ? "spin 10s linear infinite" : "none",
    transformOrigin: "center",
    boxShadow: "0 0 12px 10px #b783c9"
  }}
/>



  <div className="text-center mt-1">
    <p className="text-white font-medium text-sm">Pretty Little Baby</p>
    <p className="text-gray-400 text-xs">Connie Franchis</p>
  </div>
</div>

        {/* song controls */}
        <div className="max-w-[400px] w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <button className="text-xl text-secondary-text">
              <IoMdSkipBackward />
            </button>
            <button
              onClick={togglePlayButton}
              className="bg-white text-xl text-[#331a40] w-12 aspect-square rounded-full flex items-center justify-center"
            >
              {isPlaying ? <IoMdPause /> : <IoMdPlay />}
            </button>
            <button className="text-xl text-secondary-text">
              <IoMdSkipForward />
            </button>
          </div>

          {/* progress bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-secondary-text font-normal text-sm">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full outline-none h-1 bg-[#5b476b] rounded-md appearance-none"
            />
            <span className="text-secondary-text font-normal text-sm">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* volume + extra controls */}
        <div className="flex items-center gap-2">
          <button>
            <Repeat />
          </button>
          <button className="text-secondary-text text-xl cursor-pointer">
            <MdOutlineQueueMusic />
          </button>
          <button onClick={toggleMute} className="text-secondary-text text-xl cursor-pointer">
            {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolume}
            className="w-[100px] outline-none h-1 bg-[#5b476b] accent-white appearance-none"
          />
        </div>
      </div>
    </div>
  );
}