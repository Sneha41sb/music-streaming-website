"use client"
import Image from "next/image";
import React,{useContext} from 'react'
import { PlayerContext } from "../layouts/FrontendLayout";

export default function Queue() {
  const context = useContext(PlayerContext);

  if(!context){
    throw new Error("player context must be within a provider");
  }
  const{isQueueModalOpen} = context;
  if(!isQueueModalOpen) return null;
  return (
    <div className="fixed top-0 right-0 z-50 max-w-[300px] w-full h-[90vh] bg-black border p-4 overflow-y-auto rounded-md">
      <h2 className='text-white font-bold text-lg'>Queue</h2>

      <div className='mt-8'>
        <h2 className='text-white font-bold mb-3'>Now Playing</h2>

        <div className='flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-lg hover:bg-hover'>
          <Image 
            src="/PLAYLIST COVERS - 25.jpeg" 
            width={300} 
            height={300} 
            alt="queue-image" 
            className='w-10 h-10 object-cover rounded-md'
          />
          <div>
            <p className='text-[#b24fe8] font-semibold'>Diamond</p>
            <p className='text-sm text-[#b069d6]'>Solid</p>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-white font-bold mb-3'>Queue List</h2>

        <div className='flex items-center gap-2 cursor-pointer mb-2 p-2 rounded-lg hover:bg-hover'>
          <Image 
            src="/download (10).jpeg" 
            width={300} 
            height={300} 
            alt="queue-image" 
            className='w-10 h-10 object-cover rounded-md'
          />
          <div>
            <p className='text-[#f3ebf7] font-semibold'>Diamond</p>
            <p className='text-sm text-[#b069d6]'>Solid</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}
