"use client";
import React from "react";
import Image from "next/image";
import { supabase } from "@/lib/SupabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserSession from "@/custom.hooks/useUserSession";

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { session } = useUserSession();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/");
      } else {
        setPageLoading(false);
      }
    });
  }, []);
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim() || !artist.trim() || !audioFile || !imageFile) {
      setMessage("All fields are required!");
      setLoading(false);
      return;
    }
    try {
      // upload songs
      const timestamp = Date.now();

      //upload the image
      const imagePath = `cover-images/${timestamp}_${imageFile.name}`;
      const { error: imgError } = await supabase.storage
        .from("cover-images")
        .upload(imagePath, imageFile);

      if (imgError) {
        setMessage(imgError.message);
        setLoading(false);
        return;
      }

      //get public URL
      const {
        data: { publicUrl: imageURL },
      } = supabase.storage.from("cover-image").getPublicUrl(imagePath);

      //upload audio
      const audioPath = `songs/${timestamp}_${audioFile.name}`;
      const { error: audioError } = await supabase.storage
        .from("songs")
        .upload(audioPath, audioFile);

      if (audioError) {
        setMessage(audioError.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl: audioURL },
      } = supabase.storage.from("songs").getPublicUrl(audioPath);

      //save songs to supabase table
      const { error: insertError } = await supabase.from("songs").insert({
        title,
        artist,
        cover_image_url: imageURL,
        audio_url: audioURL,
        user_id: session?.user.id,
      });

      if (insertError) {
        setMessage(insertError.message);
        setLoading(false);
        return;
      }

      setTitle("");
      setArtist("");
      setImageFile(null);
      setAudioFile(null);
      setMessage("Song uploaded successfully");
      setTimeout(() => {
        router.push("/n");
      }, 3000);
    } catch (err) {
      console.log("Caught error:", err);
    }
  };

  if (pageLoading) return null;

  return (
    <div className="h-screen flex justify-center items-center w-full bg:hover">
      <div
        className="elative px-6 lg:px-12 py-8 rounded-md max-w-[400px] h-[600px] w-[90%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/𝘢𝘶𝘳𝘢 𝘸𝘢𝘭𝘭𝘱𝘢𝘱𝘦𝘳 💜.jpeg')",
          opacity: 0.9,
        }}
      >
        <div className="relative z-10" />

        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/music-roots.jpg"
            alt="logo"
            width={500}
            height={500}
            className="h-14 w-14"
          />
          <div className="bg-[#e6eaf0] flex-1 h-14 flex items-center justify-center">
            <p className="text-black text-2xl font-bold">upload</p>
          </div>
        </div>
        <form onSubmit={handleUpload} className="flex flex-col gap-4 w-full">
          {message && (
            <p className="=bg-{black} font-semibold text-center mb-4 py-1">
              {message}
            </p>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            type="text"
            placeholder="Title"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <input
            type="text"
            placeholder="Artist"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <label htmlFor="audio" className="block py-2 text-black">
            Audio
          </label>
          <input
            accept="audio/*"
            id="audio"
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              const file = files[0];
              setAudioFile(file);
            }}
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <label htmlFor="cover" className="block py-2 text-black">
            Cover Image
          </label>
          <input
            accept="images/*"
            id="cover"
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              const file = files[0];
              setImageFile(file);
            }}
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />

          {loading ? (
            <button className="bg-[#8c3ea3] py-3 rounded-[5%] w-full font-bold cursor-pointer text-white">
              Uploading...
            </button>
          ) : (
            <button className="bg-[#8c3ea3] py-3 rounded-[5%] w-full font-bold cursor-pointer text-white">
              Add Song
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
