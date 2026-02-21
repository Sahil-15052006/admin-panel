"use client";
import { Code, Code2, File, FolderCode, Icon, LayoutDashboard, MailIcon, Moon, Sun, User, } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'

export default function () {
    const [lightTheme,setLightTheme] = useState(false)
    const changeTheme=()=>{
        const mainDiv = document.querySelector('#mainDiv')
        mainDiv?.classList.toggle('light')
        setLightTheme(!lightTheme)
    }

  return (
    <div className='fixed'>
        <aside className='relative h-screen bg-(--dark) w-fit max-w-75 lg:w-75 flex flex-col overflow-hidden text-(--secondary) items-center border-e border-(--secondary)/20 border-collapse ' >
               <div className='text-lg font-bold w-full h-fit py-5 ps-3 text-(--primary) sm:px-5 cursor-pointer border-b border-(--secondary)/20 border-collapse '>
                <Code2/> 
                </div> 
               <div className='grid grid-cols-1 gap-3 w-full py-5 font-bold text-(--secondary) text-md justify-start ps-2 '>
                    <Link href={'/'} className='p-2 w-full h-fit flex justify-center sm:justify-start items-center space-x-3 hover:font-bold sm:hover:bg-(--secondary)/20 cursor-pointer hover:scale-105 hover:text-(--primary) transition duration-300' >
                        <LayoutDashboard className='h-5'/>
                        <div className='hidden lg:flex '>Dashboard</div>
                    </Link>
                    <Link href={'/projects'} className='p-2 w-full h-fit flex justify-center sm:justify-start items-center space-x-3 hover:font-bold sm:hover:bg-(--secondary)/20 cursor-pointer hover:scale-105 hover:text-(--primary) transition duration-300' >
                        <FolderCode className='h-5'/>
                        <div className='hidden lg:flex'>Projects</div>
                    </Link>
                    <Link href={'/skills'} className='p-2 w-full h-fit flex justify-center sm:justify-start items-center space-x-3 hover:font-bold sm:hover:bg-(--secondary)/20 cursor-pointer hover:scale-105 hover:text-(--primary) transition duration-300' >
                        <Code className='h-5'/>
                        <div className='hidden lg:flex'>Skills</div>
                    </Link>
                    <Link href={'/messages'} className='p-2 w-full h-fit flex justify-center sm:justify-start items-center space-x-3 hover:font-bold sm:hover:bg-(--secondary)/20 cursor-pointer hover:scale-105 hover:text-(--primary) transition duration-300' >
                        <MailIcon className='h-5'/>
                        <div className='hidden lg:flex'>Message</div>
                    </Link>
               </div>
               <div onClick={()=>changeTheme()} className='rounded-full hover:text-(--primary) hover:border-(--primary) p-2 w-fit border border-(--secondary) sm:absolute sm:bottom-3 sm:left-3'>
                <Moon className={`${lightTheme?'block':'hidden'}`}/>
                <Sun className={`${lightTheme?'hidden':'block'}`}/>
               </div>
        </aside>
    </div>
  )
}
