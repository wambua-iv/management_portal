import express from 'express';
import { hostelRegistration, viewHostelRegistration } from '../../../students';

const Hostel_Router = express.Router();

Hostel_Router.route('/register').post(async(req,res) => {
    const registrationForHostel = {
        names : {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
                },
        user_Id: req.body.user_Id,
        status: 'pending'
    };
    try {
        await hostelRegistration(registrationForHostel);
            res.json({message: "Hostel Booked"});
    } catch (error) {
            res.json({message: "Booking can only be done once"})
    }
    finally{
        res.end()
    }
});

Hostel_Router.route('/check_status').get(async(req, res) =>{
    const searchParams = req.body.user_Id;
    const hostelStatus = await viewHostelRegistration(searchParams);
    res.json(hostelStatus);
});

export {Hostel_Router}