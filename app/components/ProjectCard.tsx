"use client";
import React, { useState } from 'react'
import { Edit, Github } from 'lucide-react'
import UpdateProjectModal from './UpdateProjectModal';
import DeleteProject from './DeleteProject';

interface projectType{
  id:string,
  title:string,
  description:string,
  image_url:string,
  github_url:string,
  tags:string[]
}

export default function ProjectCard({project}:{project:projectType}) {

  const [open,setOpen]=useState(false)

  return (
      <div>
          {open && <UpdateProjectModal onClose={() => setOpen(false)} project={project} />}
          <div className=' slideup bg-(--dark) flex flex-col h-full w-full rounded-2xl justify-between items-center hover:bg-(--primary)/20 outline-none hover:outline-(--primary) hover:-translate-y-2 transition duration-300 overflow-hidden'>
              <div className='w-full'>
                  <div>
                    <img src={project.image_url} alt={project.title} className="w-full h-50 rounded-t-2xl object-cover" />
                  </div>
                  <div className='space-y-3 text-(--secondary) p-3'>
                    <div className='text-xl  font-semibold  text-(--light)'>{project.title}</div>
                    <div className='text-sm  '>{project.description}</div>
                    <div className="flex flex-wrap gap-1 xl:gap-3 text-xs  ">
                      {
                      project.tags.map((tag)=>
                          <span key={tag} className='justify-center items-center flex text-sx bg-(--secondary)/20 border border-collapse border-(--secondary)/40 rounded-lg px-2 py-1 whitespace-nowrap'>{tag}</span>
                      )}
                    </div>
                    <div className='flex space-x-2 flex-wrap justify-start items-center text-sm hover:text-(--primary)'>
                      <span className='text-sm flex flex-row items-center'><Github className='p-1'/>Github Link</span>
                      <a href={project.github_url}>{project.github_url} </a>
                    </div>
                  </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 justify-center h-fit w-full p-2 ">
                    <button
                      onClick={()=>(setOpen(true))}
                      className='flex flex-row w-full h-fit justify-center items-center space-x-2 rounded-lg bg-(--primary) text-[#ffffff] py-2 px-3 text-xs hover:scale-105 transition duration-300'>
                      <Edit className='h-3 w-3'/>
                      <span className='font-semibold'>Edit</span>
                    </button>
                    <DeleteProject projectId={project.id}/>
              </div>
          </div>
      </div>
  )
}
