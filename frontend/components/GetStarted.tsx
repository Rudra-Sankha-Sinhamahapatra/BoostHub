import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/utils/conf";
import { SignInStarted } from "./SignInnStarted";
import { cookies } from 'next/headers';
import { HomeStarted } from './HomeStarted';

export const GetStarted=()=>{
    const token = cookies().get("token");
    const value = token?.value || "";

    try{
      const res=jwt.verify(value,JWT_SECRET);
      if(res){
        return <HomeStarted/>
      }
    }
    catch(error){
    return <SignInStarted/>
    }
}