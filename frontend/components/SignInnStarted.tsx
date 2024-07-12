"use client"
import { useRouter } from "next/navigation"
import { Button } from "./Button"

export const SignInStarted=()=>{
    const router=useRouter();

    return(
        <div className="flex justify-center">
        <div className="dark:text-white mt-2">
         Explore More
         <div>

         </div>
         <Button content="Get Started" className="bg-purple-500 text-white py-2 px-3 rounded-md mt-2  hover:bg-purple-800" onClick={()=>{
           router.push(`/login`)
         }}/>
        </div>
        </div>
    )
}