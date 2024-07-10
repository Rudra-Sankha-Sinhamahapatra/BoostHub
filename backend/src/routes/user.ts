import express from 'express'
import jwt from 'jsonwebtoken'
import zod from 'zod'
import prisma from '../prisma';
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../conf';
import CookieParser from 'cookie-parser'

export const Userapp=express.Router();

Userapp.use(CookieParser());

const signupBody=zod.object({
email:zod.string().email(),
password:zod.string().min(5),
name:zod.string().optional(),
role:zod.string(),
})

Userapp.post('/signup',async(req,res)=>{
    const {success}=signupBody.safeParse(req.body);

    if(!success){
        return res.status(401).json({
            message:"Incorrect Inputs"
        })
    }

 const email=req.body.email;
 const password=req.body.password;
 const name=req.body.name;
const role=req.body.role;


 const existingUser=await prisma.user.findUnique({
    where:{
        email:email,
    }
 })

 if(existingUser){
    return res.status(403).json({
        message:"User Already Exists",
    })
 }

 try{
const hashedPassword=await bcrypt.hash(password,10);
const user=await prisma.user.create({
    data:{
        email:email,
        password:hashedPassword,
        name:name,
        role:role,
        createdAt:new Date(),
        updatedAt:new Date()
    }
})

const token=await jwt.sign({id:user.id},JWT_SECRET)
res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
});

return res.status(200).json({
    token:token,
    message:"User Created Successfully"
})
 }
 catch(error){
    return res.status(500).json({
        message:"Some error happened",
        error:error
    })
 }

})

const signInBody=zod.object({
email:zod.string().email(),
password:zod.string().min(5)
});

Userapp.post('/login',async(req,res)=>{
const {success}=signInBody.safeParse(req.body);

if(!success){
    return res.status(401).json({
        message:"Incorrect Inputs"
    })
}

const email=req.body.email;
const password=req.body.password;

try{
const existingUser=await prisma.user.findUnique({
    where:{
        email:email
    }
})

if(!existingUser){
    return res.status(403).json({
        message:"User dosen't exist"
    })
}

const validPassword=await bcrypt.compare(password,existingUser.password);
if(!validPassword){
    return res.status(403).json({
        message:"Incorrect Password"
    })
}

const token=await jwt.sign({id:existingUser.id},JWT_SECRET);

res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
});

return res.status(200).json({
    token:token,
    message:"Sign In Successful"
})
}
catch(error){
    return res.status(500).json({
        message:"Some Error Happened",
        error:error
    })
}
})