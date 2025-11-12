"use client"
import React, { createContext, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Queue from "../components/Queue";
import MusicPlayer from "../components/MusicPlayer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type PlayerContextType = {
  isQueueModalOpen: boolean;
  setQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryclient = new QueryClient();
  const [isQueueModalOpen, setQueueModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryclient}>
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
    </QueryClientProvider>
  );
}
