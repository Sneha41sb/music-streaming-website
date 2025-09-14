"use client"
import React, { createContext, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Queue from "../components/Queue";
import MusicPlayer from "../components/MusicPlayer";

type PlayerContextType = {
  isQueueModalOpen: boolean;
  setQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  const [isQueueModalOpen, setQueueModalOpen] = useState(false);

  return (
    <PlayerContext.Provider value={{ isQueueModalOpen, setQueueModalOpen }}>
      <div className="min-h-screen pt-16">
        <Navbar />
        <main>
          <Sidebar />
          <Queue />
          <MusicPlayer />
          {children}
        </main>
      </div>
    </PlayerContext.Provider>
  );
}
