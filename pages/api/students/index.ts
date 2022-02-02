import {Hostel_Router} from './HostelRoutes';
import { Units_Router } from './UnitRoutes'

import express from 'express';

const Student_Router = express.Router()

Student_Router.use('/hostel', Hostel_Router)
Student_Router.use('/units', Units_Router)

export {Student_Router}