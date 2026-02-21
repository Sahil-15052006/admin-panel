"use client";

import { supabase } from "@/lib/supabase";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProjectModal({ onClose }:{ onClose : () => void }) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [githubURL, setGithubURL] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null);


  const router = useRouter()

  const handleSave = async () => {
    if (!imageFile) {
      alert("Please upload an image")
      return
    }

    try {

      const tagsArray = tags
        .toLowerCase()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      const extension = imageFile.name.split(".").pop()
        
      const imageId = title
      .toLowerCase()
      .replace(/\s+/g,"-")
      .replace(/[^a-z0-9]/g,"")

      const fileName = `${imageId}-${Date.now()}.${extension}`

      const { error: uploadError } = await supabase.storage.from("projectImages").upload(fileName, imageFile);
      if (uploadError) throw uploadError;

      const { data: urlData } = await supabase.storage.from("projectImages").getPublicUrl(fileName)
      const imageURL = urlData.publicUrl

      const { error } = await supabase
      .from("project")
      .insert([{
        title,
        description,
        github_url: githubURL,
        tags: tagsArray,
        image_url: imageURL
      }])

      if (error) throw error

      console.log('Project saved');
      router.refresh() 
      onClose()

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } 

  };

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

          <label className="text-sm">Upload Image</label>
          <input
            type="file"
            onChange={(event) => { event.target.files && setImageFile(event.target.files[0]) }}
            className="w-full p-2 rounded bg-(--secondary)/20 
                       border border-(--secondary) outline-none"/>

          <label className="text-sm">Project Title</label>
          <input
            value={title}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter project title"
            className="w-full p-2 rounded-lg bg-(--secondary)/20
                       border border-(--secondary)
                       hover:border-(--primary) outline-none"/>

          <label className="text-sm">Project Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter description"
            className="w-full p-2 h-24 resize-none rounded-lg
                       bg-(--secondary)/20 border border-(--secondary)
                       hover:border-(--primary) outline-none"/>

          <label className="text-sm">Github Link</label>
          <input
            value={githubURL}
            onChange={(event) => setGithubURL(event.target.value)}
            type="url"
            placeholder="https://github.com/..."
            className="w-full p-2 rounded-lg bg-(--secondary)/20
                       border border-(--secondary)
                       hover:border-(--primary) outline-none"/>

          <label className="text-sm">Tags</label>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            type="text"
            placeholder="React, Next.js..."
            className="w-full p-2 rounded-lg bg-(--secondary)/20 border border-(--secondary) hover:border-(--primary) outline-none" />

        </div>

        <button 
        onClick={()=>{
          handleSave(),
          onClose()
        }
        }
        className="w-full bg-(--primary) p-2 rounded-xl hover:bg-(--primary)/80 transition shadow-md">
          Save Project
        </button>

      </div>
    </div>
  );
}
