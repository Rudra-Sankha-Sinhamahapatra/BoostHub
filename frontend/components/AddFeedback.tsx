"use client"

import { BACKEND_URL } from "@/utils/conf";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from "./Button";


interface Feedback {
id:number;
userId:number;
courseId:number;
comment:string;
createdAt:string;
updatedAt:string;
user:{
    name:string;
    role:string;
}
}

export const AddFeedback=()=>{
    const [feedback,setFeedback]=useState("");
    const [error,setError]=useState("");
    const [feedbacks,setFeedbacks]=useState<Feedback[]>([]);
    const params=useParams();
    const id=params.courseId;


    const fetchFeedbacks=useCallback(async()=>{
     try {
        if(id){
            const res=await axios.get(`${BACKEND_URL}/bh/v1/feedback/${id}/feedbacks`,{
                withCredentials:true,
            });
            setFeedbacks(res.data.feedbacks);
        }
     } catch (error) {
        setError("Failed to fetch feedbacks");
     }
    },[id]);

    useEffect(()=>{
     fetchFeedbacks();
    },[fetchFeedbacks]);


    const Create=useCallback(async()=>{
    try {
        const res=await axios.post(`${BACKEND_URL}/bh/v1/feedback/create`,{
            courseId:Number(id),
            comment:feedback
        },{
            withCredentials:true,
        });

        if(res.status===200){
            toast.success("Feedback given Successfully");
            setFeedback("");
            fetchFeedbacks();
        }
    } catch (error) {
       toast.error("Failed !");
    }
    },[feedback,id,fetchFeedbacks]);

    return(
        <>
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
        <div>
        <div className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5 text-2xl sm:text-3xl text-white text-center">Add Your Feedback</div>
            <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 mx-auto gap-5">
            <div>
                <div>
                    <textarea
                     name=""
                     id="feedback"
                     className="text-black border border-black w-full p-2 h-20"
                     value={feedback}
                     placeholder="Write Your Feedback(Min 1)"
                     onChange={(e)=>{
                        setFeedback(e.target.value);
                     }}
                    />
                </div>
            </div>
            <div className="flex justify-center">
            <Button
            className="text-white bg-violet-500 hover:bg-violet-700 py-2 px-4 rounded-md mt-2 mb-4"
            content="Add Feedback"
            onClick={Create}
            />
            </div>
            </div>
            {feedbacks.length>0?(
               <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 mx-auto gap-5 mt-6">
               <div className="text-xl mb-4 text-violet-500">
                Feedbacks
               </div>
               {feedbacks.map((feed)=>(
                  <div key={feed.id} className="p-4 border border-gray-300 rounded-lg dark:border-gray-700">
                  <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">
                  {feed.user?feed.user.name:"Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(feed.createdAt).toLocaleDateString()} {" "}
                    {new Date(feed.createdAt).toLocaleTimeString()}
                  </div>
                  </div>
                  <div className="mt-2 text-gray-800 dark:text-gray-300">
                   {feed.comment}
                  </div>
                  </div>
               ))}
               </div>
            ):(
                <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 mx-auto gap-5 mt-6">
                 <div className="text-xl mb-4 text-center">
                  No Feedbacks yet
                 </div>
                </div>
            )}
        </div>
        </div>
        </>
    )
}