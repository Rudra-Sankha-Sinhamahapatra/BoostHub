"use client";
import { useCallback, useState } from "react";
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

  const Create=useCallback(async()=>{
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
  },[router,title,description,content]);

  return (
    <>
      <div className="dark:bg-black dark:text-white min-h-screen">
        <div className="flex justify-center mb-5">Create Your Course</div>
        <div className="flex flex-col ml-52 w-4/5 gap-5">
          <div className="">
            <label htmlFor="" className="ml-3 text-violet-500 mb-4">
              Title
            </label>
            <div className="">
              <textarea
               id="title"
                className="text-black border border-black w-4/5 ml-3 mr-4 p-1 h-14"
                value={title}
                placeholder="Write the Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="ml-3 text-violet-500 mb-4">
              Content
            </label>
            <div className="">
              <textarea
              id="content"
                className="text-black border border-black w-4/5 ml-3 mr-4 p-1 h-20"
                value={content}
                placeholder="Write the Title"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="ml-3 text-violet-500 mb-4">
              Description
            </label>
            <div className="">
              <textarea
                id="description"
                className="text-black border border-black w-4/5 ml-3 mr-4 p-2 h-52"
                value={description}
                placeholder="Write the Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="text-white bg-violet-500 py-2 px-3 ml-3 mr-56 rounded-md mt-2 mb-4 hover:bg-violet-700"
              content="Create"
              onClick={Create}
            />
          </div>
        </div>
      </div>
      <ToastContainer
       position="top-center" 
       autoClose={5000} 
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


