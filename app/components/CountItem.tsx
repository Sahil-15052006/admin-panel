import { supabase } from '@/lib/supabase'
import { LucideIcon } from 'lucide-react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

interface Props{
    icon:LucideIcon
    section:string
}

export default async function CountItem({icon:Icon,section}:Props) {

    const {data,error} = await supabase
    .from(section)
    .select("id")
    if (error) throw error

  return (
    <div className='slideup bg-(--dark) min-w-10 sm:w-full h-auto border border-(--secondary)/50 hover:border-(--primary)/50 grid grid-cols-1 justify-start items-start rounded-lg sm:rounded-2xl p-2 sm:p-5 gap-2 sm:hover:-translate-y-2  transition-all duration-300'>
      <div className='flex justify-start items-center space-x-2'>
        <Icon className='h-5 sm:h-10 w-5 sm:w-10 bg-(--primary) text-[#FFFFFF] rounded sm:rounded-lg p-1 sm:p-2 justify-start items-center flex'/>
        <span className='text-sm sm:text-xl sm:font-bold text-(--light) ps-1'>Total {section.toWellFormed()}</span>
      </div>
      <span className='ps-1 sm:text-2xl'>{data?.length}</span>
    </div>
  )
}
