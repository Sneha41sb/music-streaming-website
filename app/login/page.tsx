"use client";

import { useState } from "react";
import { supabase } from "@/lib/SupabaseClient";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-black">
        <div
          className="relative px-6 lg:px-12 py-8 rounded-md max-w-[400px] h-[460px] w-[90%] bg-cover bg-center bg-no-repeat shadow-lg"
          style={{ backgroundImage: "url('/confetti-purple.jpeg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-md" />

          {/* Content */}
          <div className="relative z-10">
            {/* Logo + Title */}
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/music-roots.jpg"
                alt="logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded"
              />
              <div className="bg-[#e6eaf0] flex-1 h-14 flex items-center justify-center rounded">
                <p className="text-black text-2xl font-bold">Login</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border border-neutral-600 p-2 w-full rounded-md placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white caret-white bg-transparent"
              />

              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none border border-neutral-600 p-2 w-full rounded-md placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white caret-white bg-transparent"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#83618c] py-3 rounded-md w-full font-bold text-white hover:bg-[#6d4f74] transition-colors"
              >
                {loading ? "Logging in..." : "Continue"}
              </button>

              <div className="text-gray-300 text-center my-3">
                <span>Don't have an account?</span>
                <Link
                  href="/signup"
                  className="ml-2 text-white underline hover:text-[#cfa6d9]"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
