"use client";
import { supabase } from '@/lib/supabase';
import { UploadIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ProfilePic() {

    const [imageUrl, setImageUrl]=useState<string|null>(null)
    const [imageFile, setImageFile]=useState<File|null>(null)
    
    const fetchImage=async()=>{
        const {data:urlData}= supabase
        .storage
        .from("profileImage")
        .getPublicUrl("profilePic.jpeg")
        setImageUrl(`${urlData.publicUrl}?v=${Date.now()}`)
    }
    useEffect(()=>{
        fetchImage()
    },[])

    const uploadImage=async()=>{

        if (!imageFile) return 

        const {error:uploadError} =await supabase
        .storage
        .from("profileImage")
        .upload("profilePic.jpeg",imageFile,{upsert: true})

        if (uploadError) {
          console.error(uploadError)
        } else {
          console.log('Profile Pic updated');
        }

      fetchImage()
    }

  return (
    <div className='slideright w-full'>

        <div className='text-(--primary) font-medium text-2xl px-2 sm:px-5 '>
          Manage Profile Pic
        </div>

        <div className='flex flex-wrap justify-start items-center h-fit w-full gap-5 p-5'>
          
          <div className='bg-(--background) flex justify-center'>
            <img src={imageUrl} 
            alt="profile image" 
            className='rounded-full border-2 border-(--primary) object-cover h-50 w-50 transition duration-300' />
          </div>

          <div className='gap-2 flex flex-col w-full sm:w-auto'>

            <div className='bg-(--background) flex flex-row justify-center items-center text-(--secondary) gap-2 border rounded-lg h-fit p-1 hover:border-(--primary) hover:bg-(--primary)/20 transition duration-300 text-xs'>
                <UploadIcon/>
                <input 
                  type="file" 
                  onChange={(event)=>event.target.files && setImageFile(event.target.files[0])}
                  className='p-1 text-sm w-full' />
            </div>

            <button 
            onClick={()=>uploadImage()}
            className='rounded-lg bg-(--primary) w-fit p-1 sm:p-2 hover:scale-105 transition duration-300'>
                Update Profile Photo
            </button>

          </div>
        </div>
    </div>
  )
}
