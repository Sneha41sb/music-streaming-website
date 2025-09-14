"use client"
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import Image from 'next/image';
import { MdOutlineLibraryMusic } from "react-icons/md";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useUserSession from "@/custom.hooks/useUserSession";

export default function Sidebar() {
  const { loading, session } = useUserSession();

  const [sideOpen, setSidebarOpen] = useState(false);

  if (loading) return (
    <aside
      className={`fixed left-0.5 bg-background w-64 lg:w-80 rounded-lg h-[90vh] p-4 overflow-y-auto
      transform ${sideOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-500 lg:translate-x-0`}
    >
      <h2 className="text-2xl text-white text-center">Loading</h2>
    </aside>
  );

  return (
    <>
      {session && (
        <div>
          {/* Sidebar */}
          <aside
            className={`fixed left-0.5 bg-background w-64 lg:w-80 rounded-lg h-[90vh] p-4 overflow-y-auto
            transform ${sideOpen ? "translate-x-0" : "-translate-x-full"} 
            transition-transform duration-500 lg:translate-x-0`}
          >
            <div className="py-8 text-center">
              <Link href="/login"className="bg-white px-6 py-2 rounded-full font-semibold hover:text-secondary-text">Login</Link>
              <p className="mt-4 text-white">Login to view your library</p>
            </div>
          </aside>

          {/* Toggle Button (mobile only) */}
          <button
            className="fixed bottom-6 left-5 bg-background w-12 h-12 lg:hidden grid place-items-center text-white rounded-full z-50 cursor-pointer"
            onClick={() => setSidebarOpen(!sideOpen)}
          >
            <MdOutlineLibraryMusic />
          </button>
        </div>
      )}
    </>
  );
}
