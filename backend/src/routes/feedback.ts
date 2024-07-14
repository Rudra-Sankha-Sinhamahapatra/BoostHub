import express from 'express'
import { authMiddleware } from '../middleware'
import prisma from '../prisma'
import zod from 'zod'


export const feedbackRouter=express.Router();

feedbackRouter.get('/feedbacks',authMiddleware,async(req:any,res:any)=>{
    try{
    const userId=req.user.id;

    const feedbacks=await prisma.feedback.findMany({
        select:{
            userId:true,
            courseId:true,
            comment:true,
            createdAt:true,
            updatedAt:true,
            user:{
                select:{
                    name:true,
                    role:true
                },
            },
            course:{
                select:{
                    title:true,
                    description:true
                }
            }
        }

    })

    
    if(!feedbacks  || feedbacks.length===0){
        return res.status(404).json({
            message:"No feedbacks found"
        })
    }

    return res.staus(200).json({
        feedbacks:feedbacks.map(feeback=>({
        userId:feeback.userId,
        courseId:feeback.courseId,
        comment:feeback.comment,
        createdAt:{
            date:feeback.createdAt.toLocaleDateString(),
            time:feeback.createdAt.toLocaleTimeString()
        },
        updatedAt:{
            date:feeback.updatedAt.toLocaleDateString(),
            time:feeback.updatedAt.toLocaleTimeString()
        },
        user:{
            name:feeback.user.name,
            role:feeback.user.role
        },
        course:{
            title:feeback.course.title,
            description:feeback.course.description
        }
        })),
    });

    }
    catch(error){
   res.status(500).json({
    message:"Interval Server Error",
    error:error
   })
    }
})