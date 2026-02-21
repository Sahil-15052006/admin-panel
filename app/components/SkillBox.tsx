"use client";

import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import SkillItem from './SkillItem'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Skills from '../skills/page';


export default function SkillBox({heading,skills}:{heading:string,skills:any[]}) {

    const [skillName,setSkillName]=useState('')
    const [type,setType]=useState('')

    const router=useRouter()

    const handleSave=async()=>{
        const {error} = await supabase
        .from("skills")
        .insert([{
        skillName,
        type
        }])

        if (error) throw error

        console.log('Skill saved');
        router.refresh()
    }

    const filteredSkill=skills.filter((skill)=>skill.type===heading)

  return (
    <div className='slideright border border-(--secondary)/40 rounded-xl bg-(--dark) items-center p-5 space-y-5 '>
            <div className='font-semibold text-4xl'>
              {heading}
            </div>
            <div>
              <div className='flex justify-between items-center space-x-2 h-10'>
                <input 
                    value={skillName}
                    onChange={(event)=>{
                        setSkillName(event.target.value),
                        setType(heading)
                    }}
                    type="text" placeholder='Enter skill' className='w-full py-2 rounded-lg ps-2 border border-(--secondary) outline-none focus-within:border-(--primary)' />
                <button 
                    onClick={()=>{
                        handleSave(),
                        setSkillName("")
                    }}
                    className='flex space-x-2 bg-(--primary) rounded-lg text-sm w-fit h-full text-center p-2 justify-center items-center hover:scale-105 font-light transition duration-100'>
                  <PlusIcon className='h-5 w-5'/>
                  <span>Add</span>
                </button>
              </div>
              <div className='w-full h-fit p-1 mt-1'>
                {
                  filteredSkill.length === 0 && 
                  <div className="w-full h-full text-center text-sm text-(--secondary)">No skills yet</div>
                }
                { 
                filteredSkill.map((skill)=>
                        <SkillItem key={skill.id} skill={skill}/>
                    )
                }
              </div>
            </div>
        </div>
  )
}
