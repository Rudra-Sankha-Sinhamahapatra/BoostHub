"use client"

import { BACKEND_URL } from "@/utils/conf";
import { useRouter } from "next/navigation"


export const Nav=()=>{

    const router=useRouter();

    const homeHandler=()=>{
        router.push(`/home`)
    }

    const createHandler=()=>{
        router.push(`/home/create`)
    }

    const myCoursesHandler=()=>{
        router.push(`/home/mycourse`)
    }

    const infoHandler=()=>{
        router.push(`/home/info`)
    }

    return(
        <>
          <div className=" grid grid-cols-4 gap-5 md:flex md:flex-row md:justify-center md:gap-5 text-violet-500  mb-8 ml-3 mt-2">
                    <div className="cursor-pointer hover:text-violet-700" onClick={myCoursesHandler}>My Courses</div>
                    <div className="cursor-pointer hover:text-violet-700" onClick={homeHandler}>Home</div>
                    <div className="cursor-pointer hover:text-violet-700" onClick={createHandler}>Create Course</div>
                    <div className="cursor-pointer hover:text-violet-700" onClick={infoHandler}>Rules</div>
                </div>
        </>
    )
}