import {Code2Icon, FolderCode, MailIcon, UploadIcon} from 'lucide-react'
import Resume from './components/Resume'
import CountItem from './components/CountItem'
import ProfilePic from './components/ProfilePic'

export default function Dashboard() {

  return (
    <div className='w-full'>
        <div className='slideup text-4xl sm:text-4xl font-bold flex justify-between text-(--primary) items-center w-full p-2 sm:p-5 '>
            Dashboard
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 sm:h-fit w-full gap-2 sm:gap-5 p-2 sm:p-5'>
            <CountItem icon={FolderCode} section={"project"}/>
            <CountItem icon={Code2Icon} section={"skills"}/>
            <CountItem icon={MailIcon} section={"messages"}/>
        </div>
        <ProfilePic/>
        <div className='slideup rounded-xl p-2 sm:p-5 space-y-2'>
          <div className='text-2xl font-semibold w-full h-fit text-(--primary)'>
            Resume
          </div>
          <Resume/>
        </div>
    </div>
  )
}

