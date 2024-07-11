"use client"

import { useRouter } from "next/navigation"

interface NoPageProps{
    label:string;
    choice:string;
    route:string
}

export default function NoPage({label,choice,route}:NoPageProps){
    const router=useRouter();
  return(
    <>
    <div className="flex justify-center  mt-10">
       {label} <span className="text-violet-500 cursor-pointer ml-2" onClick={()=>{
            router.push(`/${route}`)
        }}>{choice}</span>
    </div>
    </>
  )
}