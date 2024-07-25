"use client";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/utils/conf";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const router=useRouter();

  const Create=async()=>{
      try {
        await axios.post(`${BACKEND_URL}/bh/v1/course/create`,{
            title,
            description,
            content
        },{
            withCredentials:true,
        })
        toast.success("Course created successfully!");
        setTimeout(() => {
            router.push('/home/mycourse');
          }, 4000);
      } catch (error) {
        toast.error("Failed to create course.");
      }
  };


  useEffect(() => {
    CreateCourse();
  }, [router,title,content,description]);
  
  return (
    <>
      <div className="dark:bg-black dark:text-white min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-5 text-2xl sm:text-3xl">Create Your Course</div>
        <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 mx-auto gap-5">
          <div className="">
            <label htmlFor="title" className="ml-3 text-violet-500 mb-4 block">
              Title
            </label>
            <div className="">
              <textarea
               id="title"
                className="text-black border border-black w-full p-2 h-14"
                value={title}
                placeholder="Write the Title (Min 3 letter)"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="content" className="ml-3 text-violet-500 mb-4 block">
              Content
            </label>
            <div className="">
              <textarea
              id="content"
                className="text-black border border-black w-full p-2 h-20"
                value={content}
                placeholder="Write the Content(min 3 letter)"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="description" className="ml-3 text-violet-500 mb-4 block">
              Description
            </label>
            <div className="">
              <textarea
                id="description"
                className="text-black border border-black w-full p-2 h-52"
                value={description}
                placeholder="Write the Description (min 3 letter)"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="text-white bg-violet-500 py-2 px-4 rounded-md mt-2 mb-4 hover:bg-violet-700"
              content="Create"
              onClick={Create}
            />
          </div>
        </div>
      </div>
      <ToastContainer
       position="top-center" 
       autoClose={3000} 
       hideProgressBar={false} 
       newestOnTop={false} 
       closeOnClick 
       rtl={false} 
       pauseOnFocusLoss 
       draggable 
       pauseOnHover 
       theme="colored" 
      />
    </>
  );
}
