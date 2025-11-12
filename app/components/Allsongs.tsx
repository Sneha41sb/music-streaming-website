"use client"
import Image from 'next/image';
import Link from "next/link";
import { IoMdPlay } from 'react-icons/io';
import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function Allsongs() {
  const getAllSongs = async () => {
    const {data,error} = await supabase.from("songs").select("*");

    if(error){
      console.log("fetchAllSongsError:",error.message);
    }

    return data;
  }

  const {data:songs,isLoading,error,isError} = useQuery({
    queryFn:getAllSongs,
    queryKey:["allsongs"]
  })

  if(isLoading)
    return(
      <div className="min-h-[90vh] bg-[#160E16] my-16 p-4 lg:ml-80 rounded-lg mx-4 sm:ml-0 lg:ml-[22rem]">
        <h2 className="text-2xl text-white mb-3 font-semibold">New Songs</h2>
        <h2 className='text-center text-white text-2xl'>Loading</h2>
      </div>
    );
  
    if(isError)
    return(
      <div className="min-h-[90vh] bg-[#160E16] my-16 p-4 lg:ml-80 rounded-lg mx-4 sm:ml-0 lg:ml-[22rem]">
        <h2 className="text-2xl text-white mb-3 font-semibold">New Songs</h2>
        <h2 className='text-center text-white text-2xl'>{error.message}</h2>
      </div>
    );

  return (
    <div className="min-h-[90vh] bg-[#160E16] my-16 p-4 lg:ml-80 rounded-lg mx-4 sm:ml-0 lg:ml-[22rem]">
      <h2 className="text-2xl text-white mb-3 font-semibold">New Songs</h2>
      <div className="grid gap-2 gird-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <button className='absolute bottom-18 right-5 text-[white] w-10 h-10 rounded-full bg-[#39323b] flex items-center justify-center cursor-pointer shadow-md group-hover:opacity-100 group-hover:bottom-20 group-hover:bg-[#b468e8]'>
            <IoMdPlay size={24}/>
          </button>
          <Image src="/download (8).jpeg"alt="cover-image" width={330} height={400} className='w-full h-50 object-cover rounded-md'/>
          <div className='mt-2'>
            <p className='text-primary-text font-semibold'>Lanterns in the Mist</p>
            <p className='text-secondary-text text-sm'>by Silver Haze</p>
          </div>
        </div>
        <div className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <button className='absolute bottom-18 right-5 text-[white] w-10 h-10 rounded-full bg-[#39323b] flex items-center justify-center cursor-pointer shadow-md group-hover:opacity-100 group-hover:bottom-20 group-hover:bg-[#b468e8]'>
            <IoMdPlay size={24}/>
          </button>
          <Image src="/spotify playlist cover aesthetic ⟡_⁺.jpeg"alt="cover-image" width={330} height={400} className='w-full h-50 object-cover rounded-md'/>
          <div className='mt-2'>
            <p className='text-primary-text font-semibold'>Midnight Whispers</p>
            <p className='text-secondary-text text-sm'>Lantern Glow</p>
          </div>
        </div>
        <div className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <button className='absolute bottom-18 right-5 text-[white] w-10 h-10 rounded-full bg-[#39323b] flex items-center justify-center cursor-pointer shadow-md group-hover:opacity-100 group-hover:bottom-20 group-hover:bg-[#b468e8]'>
            <IoMdPlay size={24}/>
          </button>
          <Image src="/𝐆𝐎𝐋𝐃.jpeg"alt="cover-image" width={330} height={400} className='w-full h-50 object-cover rounded-md'/>
          <div className='mt-2'>
            <p className='text-primary-text font-semibold'>Geeli Sadkon Par Ishq</p>
            <p className='text-secondary-text text-sm'>by Neel Chandni</p>
          </div>
        </div>
        <div className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <button className='absolute bottom-18 right-5 text-[white] w-10 h-10 rounded-full bg-[#39323b] flex items-center justify-center cursor-pointer shadow-md group-hover:opacity-100 group-hover:bottom-20 group-hover:bg-[#b468e8]'>
            <IoMdPlay size={24}/>
          </button>
          <Image src="/Tick-tack -illit ⏱️🍀🦷.jpeg"alt="cover-image" width={330} height={400} className='w-full h-50 object-cover rounded-md'/>
          <div className='mt-2'>
            <p className='text-primary-text font-semibold'>Tick-Tack</p>
            <p className='text-secondary-text text-sm'>by ILLIT</p>
          </div>
        </div>
        <div className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <button className='absolute bottom-18 right-5 text-[white] w-10 h-10 rounded-full bg-[#39323b] flex items-center justify-center cursor-pointer shadow-md group-hover:opacity-100 group-hover:bottom-20 group-hover:bg-[#b468e8]'>
            <IoMdPlay size={24}/>
          </button>
          <Image src="/Happier Than Ever.jpeg"alt="cover-image" width={330} height={400} className='w-full h-50 object-cover rounded-md'/>
          <div className='mt-2'>
            <p className='text-primary-text font-semibold'>Happier than ever</p>
            <p className='text-secondary-text text-sm'>by Billie Eilish</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}
