"use client";
import { DeleteIcon, Edit, Github, PlusIcon, Share2Icon, Trash } from 'lucide-react'
import React, { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import AddProjectModal from '../components/AddProjectModal'
import UpdateProjectModal from '../components/UpdateProjectModal';

export default function ProjectsClient({projects}:{projects:any[]}) {


  const [open,setOpen]=useState(false)

  return (
    <div >
        {open && <AddProjectModal onClose={() => setOpen(false)} />}
        <div className='slideup text-xl sm:text-4xl font-bold flex justify-between text-(--primary) items-center w-full p-2 sm:p-5 '>
          <div className='slideup ps-2 sm:ps-5'>
            Projects
          </div>
          <button onClick={()=>setOpen(true)} className='slideup bg-(--primary) text-sm text-[#ffffff] sm:text-lg rounded-xl p-2 sm:p-3 flex justify-center items-center space-x-2 hover:scale-105 transition duration-300 me-2 sm:me-5'>
            <PlusIcon/>
            <span>Add Project</span>
          </button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 xl:gap-10 p-2 sm:p-5 xl:p-10 '>
          {
            projects?.map((project)=>
              <ProjectCard key={project.id} project={project}/>
            )
          }
        </div>
      </div>
  )
}
