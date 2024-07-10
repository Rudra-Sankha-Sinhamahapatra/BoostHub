import express from 'express'
import cors from 'cors'
import { Userapp } from './routes/user';

const PORT=3001;
const app=express();
app.use(express.json());
app.use(cors());

const router=express.Router();

app.use('/bh/v1/user',Userapp);

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`);
})