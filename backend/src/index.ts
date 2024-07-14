import express from 'express'
import cors from 'cors'
import { Userapp } from './routes/user';
import { FRONTEND_URL } from './conf';
import { courseRouter } from './routes/course';
import cookieParser from 'cookie-parser';
import { feedbackRouter } from './routes/feedback';

const PORT=3001;
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:`${FRONTEND_URL}`,
    credentials:true
}));

const router=express.Router();



app.use('/bh/v1/user',Userapp);
app.use('/bh/v1/course',courseRouter);
app.use('/bh/v1/feedback',feedbackRouter);

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
})