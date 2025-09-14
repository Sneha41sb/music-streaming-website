"use client"
import React from 'react'
import Image from 'next/image';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const[loading,setLoading] = useState(true);
 
  useEffect(() => {
    supabase.auth.getSession().then(({data}) => {
      if(!data.session){
 
        router.push("/");
      }else{
        setLoading(false);
      }
    })

  },[]);
  if(loading) return null;

  return (
    <div className="h-screen flex justify-center items-center w-full bg:hover">
    <div
  className="elative px-6 lg:px-12 py-8 rounded-md max-w-[400px] h-[600px] w-[90%] bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/𝘢𝘶𝘳𝘢 𝘸𝘢𝘭𝘭𝘱𝘢𝘱𝘦𝘳 💜.jpeg')", opacity: 0.9 }}
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
        <form className="flex flex-col gap-4 w-full">
            <input
            type="text"
            placeholder="Title"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <input
            type="text"
            placeholder="Artist"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <label htmlFor='audio' className='block py-2 text-black'>Audio</label>
          <input
            id='audio'
            type="file"
            placeholder="Artist"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          <label htmlFor='cover' className='block py-2 text-black'>Cover Image</label>
          <input
            id='cover'
            type="file"
            placeholder="Artist"
            className="outline-none border border-neutral-400 p-2 w-full rounded-md placeholder-[#050505] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[#050505] caret-black bg-transparent"
          />
          
        <button className='bg-[#8c3ea3] py-3 rounded-[5%] w-full font-bold cursor-pointer text-white'>Add Song</button>
        
        </form>
      </div>
    </div>
  );
}


