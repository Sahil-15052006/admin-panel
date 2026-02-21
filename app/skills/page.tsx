import { supabase } from '@/lib/supabase';
import SkillBox from '../components/SkillBox'

export default async function Skills() {

    const { data: skills } = await supabase
    .from("skills")
    .select("*");

  return (
    <div>

      <div className='slideup text-xl sm:text-4xl font-bold flex justify-between text-(--primary) items-center w-full p-2 sm:p-5 '>
        Skills
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 p-2 sm:p-5 gap-5'>

        <SkillBox heading={"Frontend"} skills={skills ?? []}/>
        <SkillBox heading={"Backend"} skills={skills ?? []}/>
        <SkillBox heading={"Tools"} skills={skills ?? []}/>
        <SkillBox heading={"Learning"} skills={skills ?? []}/>
           
      </div>
    </div>
  )
}
