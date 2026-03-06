"use client"
import { supabase } from '@/lib/supabase'
import { url } from 'inspector'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Resume() {

  const [file,setFile]=useState<File|null>(null)
  const [previewURL,setPreviewURL]=useState<string|null>(null)
  const router=useRouter()

  useEffect(()=>{

    const loadResume=async()=>{
        const {data} =await supabase
        .storage
        .from("resume")
        .getPublicUrl("resume.pdf")
        setPreviewURL(data.publicUrl)
    }

    loadResume()

  },[])

  const handleResume = async()=>{
      
      
      if (!file) return
      
      const extension=file?.name.split(".").pop()
      const fileName=`resume.${extension}`

      const {error} = await supabase
      .storage
      .from("resume")
      .upload(fileName,file)
      if(error) throw error
      console.log('file uploaded')
      
      const {data:urlData} = await supabase.storage.from("resume").getPublicUrl(fileName)
      setPreviewURL(urlData.publicUrl)
      console.log("url fetched");  
      router.refresh()

    
  }
  
  return (
    <div className='space-y-2'>
        <div className='slideright bg-(--secondary)/10 p-2 sm:p-5 rounded-xl space-y-2'>
            <div className='text-lg'>Upload Resume</div>
            <div className='text-sm border rounded-xl border-(--secondary)/50 bg-(--dark) p-5 space-x-2 items-center hover:bg-(--primary)/20 flex flex-row w-full overflow-hidden'>
                <Upload/>
                <input
                onChange={(event)=>event.target.files && setFile(event.target.files[0])}
                type="file" 
                className='w-full overflow-hidden' />
            </div>
            <div className='text-xs text-(--secondary)/50 p-1'>Upload 'pdf' only</div>
            <button 
                onClick={()=>handleResume()}
                className='bg-(--primary) rounded-lg border-(--light) p-1 sm:p-2 hover:scale-105
                transition duration-300 w-full sm:w-fit'>Update resume</button> 
        </div>
        <div className="slideright h-full flex justify-center items-center rounded-xl border-(--secondary)/50 bg-(--dark) p-5 overflow-hidden transition duration-300">
            <iframe
              src={previewURL || ""}
              className="w-full h-full object-fill min-h-100 rounded-lg"
            />
        </div>
    </div>
  )
}
