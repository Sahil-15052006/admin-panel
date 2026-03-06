"use client"
import { supabase } from '@/lib/supabase'
import { Reply, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface messageType{
  id:number,
  name:string,
  email:string,
  content:string
}

export default function MessageItem({message}:{message:messageType}) {

  const router = useRouter()

  const handleDelete=async()=>{
    try{
      const {error} = await supabase
      .from("messages")
      .delete()
      .eq("id",message.id)
      if (error) throw error;
            console.log('Message Deleted');
            router.refresh()
      } catch (err) {
            console.error(err)
            alert("Failed delete the message")
    }  
  }

  return (
    <div className='slideright flex items-start p-1 sm:p-2 border border-(--secondary)/40 hover:border-(--primary) w-full hover:h-fit space-x-2 rounded-2xl group transition duration-300'>
            <div className=' w-fit h-full flex items-start justify-center text-(--primary) font-bold sm:text-lg '>
              <span className='bg-(--dark) rounded-full h-10 w-10 p-2 text-center flex items-center justify-center'>
                {message.name[0]}
              </span>
            </div>
            <div className='space-y-2 text-(--secondary) justify-start items-center'>
              <div className='text-xl font-medium text-(--light)'>{message.name}</div>
              <div>{message.email}</div>
              <div className='flex flex-wrap'>{message.content}</div>
              <div className='flex flex-row space-x-2 p-2 transition duration-300 w-full '>
                <Trash2 
                onClick={handleDelete}
                className='flex hover:bg-(--primary)/20 rounded-xl border border-(--primary)/10 hover:scale-105 p-2 h-10 w-10 transition duration-300 '/>
              </div>
            </div>
    </div>
  )
}
