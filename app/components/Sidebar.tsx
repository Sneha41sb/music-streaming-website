"use client";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import Image from "next/image";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { useState } from "react";
import useUserSession from "@/custom.hooks/useUserSession";

export default function Sidebar() {
  const { loading, session } = useUserSession();
  const [sideOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <aside
        className={`fixed left-0.5 bg-background w-64 lg:w-80 rounded-lg h-[90vh] p-4 overflow-y-auto
        transform ${sideOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-500 lg:translate-x-0`}
      >
        <h2 className="text-2xl text-white text-center">Loading...</h2>
      </aside>
    );
  }

  return (
    <>
      <aside
        className={`fixed left-0.5 bg-background w-64 lg:w-80 rounded-lg h-[90vh] p-4 overflow-y-auto
        transform ${sideOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-500 lg:translate-x-0`}
      >
        {session ? (
          <>
            {/* Header */}
            <div className="flex justify-between text-white items-center p-2 mb-4">
              <h2 className="font-bold">Your Library</h2>
              <Link href="upload-song">
                <LuPlus size={20} className="cursor-pointer hover:text-secondary-text" />
              </Link>
            </div>

            {/* Songs List */}
            <div className="space-y-3">
              <SongItem img="/Uyire 💗.jpg" title="Uyire" artist="Sid Sriram" />
              <SongItem img="/PLAYLIST COVERS - 25.jpeg" title="Lover" artist="Taylor Swift" />
              <SongItem img="/PENGUIN_33.jpg" title="Touch" artist="KATSEYE" />
              <SongItem img="/ok jannu.jpg" title="Enna Sona" artist="A R Rahman" />
              <SongItem img="/download.jpg" title="Don't Call Me Up" artist="Mabel" />
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <Link
              href="/login"
              className="bg-white px-6 py-2 rounded-full font-semibold hover:text-secondary-text"
            >
              Login
            </Link>
            <p className="mt-4 text-white">Login to view your library</p>
          </div>
        )}
      </aside>

      {/* Toggle Button (mobile only) */}
      <button
        className="fixed bottom-6 left-5 bg-background w-12 h-12 lg:hidden grid place-items-center text-white rounded-full z-50 cursor-pointer"
        onClick={() => setSidebarOpen(!sideOpen)}
      >
        <MdOutlineLibraryMusic />
      </button>
    </>
  );
}

/* ✅ Reusable Song Component */
function SongItem({ img, title, artist }: { img: string; title: string; artist: string }) {
  return (
    <div className="flex gap-2 items-center cursor-pointer p-2 rounded-lg hover:bg-hover">
      <Image
        src={img}
        alt={title}
        width={40}
        height={40}
        className="w-10 h-10 object-cover rounded-md"
      />
      <div>
        <p className="text-[#f4f2f5] font-semibold">{title}</p>
        <p className="text-[#d7d0d9] text-sm">{artist}</p>
      </div>
    </div>
  );
}
