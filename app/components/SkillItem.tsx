
import { supabase } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface skillType{
  id: number,
  skillName: string,
  type: string
}


export default function SkillItem({skill}:{skill:skillType}) {

  const router=useRouter()
  const handleDelete=async()=>{
    const {error} =await supabase
    .from("skills")
    .delete()
    .eq("id",skill.id)
    if (error){
      console.error(error)
    }
    router.refresh()
  }

  return (
    <div className='grid group grid-cols-1 gap-1 w-full text-sm font-light text-(--secondary) hover:bg-(--primary)/10 rounded-lg p-2 transition duration-500'>
        <div className='flex grid-cols-subgrid justify-between items-center'>
          <span>{skill.skillName}</span>
          <Trash2
          onClick={()=>handleDelete()} 
          className='hidden group-hover:block h-5 w-5'/>
        </div>
    </div>
  )
}
