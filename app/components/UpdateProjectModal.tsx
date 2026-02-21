"use client";

import { supabase } from "@/lib/supabase";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface projectType {
  id: string,
  title: string,
  description: string,
  image_url: string,
  github_url: string,
  tags: string[]
}

export default function UpdateProjectModal({ onClose, project }: { onClose: () => void, project: projectType }) {

  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description)
  const [tags, setTags] = useState(project.tags.join(","))
  const [githubURL, setGithubURL] = useState(project.github_url)
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter()

  const handleEdit = async () => {

    try {

      let imageURL = project.image_url

      if (imageFile) {
        const extension = imageFile.name.split(".").pop()
        
        const imageId = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9]/g, "")
        
        const fileName = `${imageId}-${Date.now()}.${extension}`
        
        const { error: uploadError } = await supabase.storage.from("projectImages").upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        
        const { data: urlData } = await supabase.storage.from("projectImages").getPublicUrl(fileName)
        imageURL = urlData.publicUrl
      } 
      
      const tagsArray = tags
        .toLowerCase()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      const { data, error } = await supabase
      .from("project")
      .update({
        title,
        description,
        github_url: githubURL,
        tags: tagsArray,
        image_url: imageURL
      })
      .eq("id",project.id)
      .select()

      if (error) throw error

      console.log('Project Updated');
      console.log("Updated data:", data);
      console.log("Error:", error);
      router.refresh()
      onClose()

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }

  }

  return (
    <div
      onClick={onClose}
      className="inset-0 fixed flex z-50 items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <XIcon
        onClick={onClose}
        className="absolute right-4 top-4 cursor-pointer hover:scale-110 transition" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto
                   rounded-xl bg-(--background)
                   border border-(--secondary)/20
                   shadow-2xl p-5 flex flex-col gap-4">

        <div className="space-y-3 bg-(--dark) p-3 rounded-xl">

          <label className="text-sm">Image</label>
          <input
            type="file"
            onChange={(event)=>event.target.files && setImageFile(event.target.files[0])}
            className="w-full p-2 rounded bg-(--secondary)/20 
                       border border-(--secondary) outline-none"/>

          <label className="text-sm">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(event)=>setTitle(event.target.value)}
            placeholder="Enter project title"
            className="w-full p-2 rounded-lg bg-(--secondary)/20
                       border border-(--secondary)
                       hover:border-(--primary) outline-none"/>

          <label className="text-sm">Project Description</label>
          <textarea
            value={description}
            onChange={(event)=>setDescription(event.target.value)}
            placeholder="Enter description"
            className="w-full p-2 h-24 resize-none rounded-lg
                       bg-(--secondary)/20 border border-(--secondary)
                       hover:border-(--primary) outline-none"/>

          <label className="text-sm">Github Link</label>
          <input
            type="url"
            value={githubURL}
            onChange={(event)=>setGithubURL(event.target.value)}
            placeholder="https://github.com/..."
            className="w-full p-2 rounded-lg bg-(--secondary)/20
                       border border-(--secondary)
                       hover:border-(--primary) outline-none"/>

          <label className="text-sm">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(event)=>setTags(event.target.value)}
            placeholder="React, Next.js..."
            className="w-full p-2 rounded-lg bg-(--secondary)/20 border border-(--secondary) hover:border-(--primary) outline-none" />

        </div>

        <button  
          onClick={()=>handleEdit()}
          className="w-full bg-(--primary) p-2 rounded-xl hover:bg-(--primary)/80 transition shadow-md">
          Update Project
        </button>

      </div>
    </div>
  );
}
