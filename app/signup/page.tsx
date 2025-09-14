"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import signUpUser from "../../lib/auth/signUpUser";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("All fields are required");
      return;
    }

    const result = await signUpUser(name, email, password);
    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("Signup successful");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <div
        className="relative px-6 lg:px-12 py-8 rounded-md max-w-[400px] h-[500px] w-[90%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/download (9).jpeg')", opacity: 0.9 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/music-roots.jpg"
            alt="logo"
            width={500}
            height={500}
            className="h-14 w-14"
          />
          <div className="bg-[#e6eaf0] flex-1 h-14 flex items-center justify-center">
            <p className="text-black text-2xl font-bold">Signup</p>
          </div>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
          {message && 
            <p className="bg-[#e8a9e8] font-semibold text-center mb-4 py-1">
              {message}
            </p>
          }

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Your Email"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Your Password"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <button className="bg-[#e8a9e8] py-3 rounded-md w-full font-bold cursor-pointer">
            Continue
          </button>
          <div className="text-center my-5 text-[#333232]">
            <span>Already have an account?</span>
            <Link
              href="/login"
              className="ml-2 text-black underline hover:text-[#1f1e1e] font-medium"
            >
              Sign in now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
