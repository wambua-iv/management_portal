import express from 'express';
import cors from 'cors';
import {Auth_Router} from './user_routes/index'
import { Student_Router } from './students';

export const app = express();


app.use(cors());
app.use(express.json());

app.get('/users', (req, res)=>{
    return res.json('homie')
})

app.use('/auth', Auth_Router);
app.use('/student', Student_Router)


const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));