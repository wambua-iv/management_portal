import express from 'express';
import cors from 'cors';
import {Auth_Router} from './user_routes/index'
import { Student_Router } from './students';
import { adminRouter } from './adminstration';

export const app = express();


app.use(cors());
app.use(express.json());

app.get('/users', (req, res)=>{
    return res.json('homie')
})

app.use('/auth', Auth_Router);
app.use('/student', Student_Router);
app.use('/admin', adminRouter);


const PORT = process.env.PORT || 8082;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));