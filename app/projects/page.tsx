
import React from 'react'
import ProjectsClient from './ProjectsClient'
import { supabase } from '@/lib/supabase';

export default async function Projects() {

    const {data:projects,error}= await supabase
      .from("project")
      .select("*")
      .order("created_at",{ascending:false});
    
      if(error){
        console.error(error)
      }

  return (
    <div >
        <ProjectsClient projects={projects??[]}/>
    </div>
  )
}
