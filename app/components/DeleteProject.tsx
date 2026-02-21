import { supabase } from '@/lib/supabase'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DeleteProject ({projectId}:{projectId:any}) {
    
    const router = useRouter()

    const handleDelete=async()=>{
        
        try{
            const {error} = await supabase
            .from("project")
            .delete()
            .eq("id",projectId)
             
            if (error) throw error;
            console.log('Project Deleted');
            router.refresh()
        } catch (err) {
            console.error(err)
            alert("Failed delete the project")
        }        
    }
  return (
    <button onClick={()=>handleDelete()} className='flex w-full justify-center items-center space-x-2 rounded-lg bg-(--primary)/20 text-(--light) px-3 py-2 text-xs hover:scale-105 transition duration-300'>
        <Trash className='h-3 w-3'/>
    </button>
  )
}
