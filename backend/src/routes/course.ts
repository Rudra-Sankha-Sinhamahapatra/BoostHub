import express from 'express';
import { authMiddleware } from '../middleware';
import prisma from '../prisma'; 
import zod from 'zod'

export const courseRouter = express.Router();


const creationBody = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(3),
    content:zod.string().min(3)
  });

courseRouter.post('/create', authMiddleware, async (req:any,res:any) => {

    const { success } = creationBody.safeParse(req.body);

    if (!success) {
      return res.status(401).json({
        message: "Incorrect Inputs",
      });
    }
  

  const title=req.body.title;
  const description=req.body.description;
  const content=req.body.content;

  const teacherId = req.user.id; 

  try {
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        content,
        teacherId,
      },
    });

    res.status(200).json({
        title:newCourse.title,
        description:newCourse.description,
        content:newCourse.content
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error,creation failed', error });
  }
});