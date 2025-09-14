"use client";

import useUserSession from "@/custom.hooks/useUserSession";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";
import LogoutUser from "@/lib/auth/logoutUser";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { session, loading } = useUserSession(); // ✅ removed setSession

  const handleLogout = async () => {
    try {
      await LogoutUser(); // this should call supabase.auth.signOut()
      router.push("/login"); // redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="h-15 flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-black z-[100] shadow-md">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 bg-black overflow-hidden flex items-center justify-center"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        >
          <img
            src="/music-roots.jpg"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <Link
          href="/"
          className="bg-background w-10 h-10 grid place-items-center text-white text-3xl rounded-full"
        >
          <MdHomeFilled />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="bg-background flex items-center h-9 w-full sm:w-[22.5rem] px-2.5 gap-3 text-primary-text rounded-full shadow-md hover:shadow-lg hover:shadow-primary-text/28 transition">
            <GoSearch className="text-primary-text shrink-0" />
            <input
              type="text"
              placeholder="Find your favorite track…"
              className="bg-transparent outline-none w-full placeholder-primary-text"
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-8">
        <div className="lg:flex hidden gap-2 text-secondary-text font-bold border-r-2 border-primary-text pr-4">
          <a href="#" className="hover:text-primary-text">
            Premium
          </a>
          <a href="#" className="hover:text-primary-text">
            Support
          </a>
          <a href="#" className="hover:text-primary-text">
            Download
          </a>
        </div>

        <div>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : session ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer h-9 bg-white text-gray-850 rounded-full font-bold hover:bg-secondary-text grid px-3.5 place-items-center"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="h-9 bg-white text-gray-850 rounded-full font-bold hover:bg-secondary-text grid px-3.5 place-items-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
