import MessageItem from '../components/MessageItem'
import { supabase } from '@/lib/supabase'

export default async function Messages() {
    
    const {data:messages,error}= await supabase
    .from("messages")
    .select("*")
  
    if (error) throw error

  return (
    <div className='p-2'>
      <div className='slideup text-xl sm:text-4xl font-bold flex justify-between text-(--primary) items-center w-full p-2 sm:p-5 '>
        Messages
      </div>
      <div className=' p-2 grid grid-cols-1 rounded gap-2 transition duration-300'>
        {
          messages?.map((message)=>
            <MessageItem key={message.id} message={message}/>
          )
        }
      </div>
    </div>
  )
}
