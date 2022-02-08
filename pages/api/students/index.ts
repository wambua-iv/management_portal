import express from 'express';
import {
    hostelRegistration,
    viewHostelRegistration,
    makePayment, payFee,
    checkUnits,
    registerSemester
} from '../../../students';


const Student_Router = express.Router()


Student_Router.route('/hostel_registration').post(async (req, res) => {
    try {
        await hostelRegistration(req.body.user_Id);
        res.json({ message: "Hostel Booked" });
    } catch (error) {
        res.json({ message: "Booking can only be done once" })
    }
    finally {
        res.end()
    }
});


Student_Router.route('/view_hostel_status').get(async (req, res) => {
    const searchParams = req.body.user_Id;
    const hostelStatus = await viewHostelRegistration(searchParams);
    res.json(hostelStatus);
});



Student_Router.route('/payment_status').get(async (req, res) => {

});


Student_Router.route('/register_semester').post(async (req, res) => {
    const semesterData = {
        user_Id: req.body.user_Id,
        title: req.body.title,
        date: Date.now(),
        units: req.body.units
    }
    try {
        const sem = await registerSemester(semesterData);
        res.json(sem)
        console.log(sem)
    } catch (error: any) { res.json(error); console.log(error) }
    finally { res.end() }
});


Student_Router.route('/check_semester').get(async (req, res) => {
    const searchParams = req.body.user_Id;
    const retrievedUnits = await checkUnits(searchParams);
    res.json(retrievedUnits);
});


Student_Router.route('/make_payment').get(async (req, res) => {
    const paymentData = {
        nameOfPayment: req.body.name,
        paymentMode: req.body.mode,
        amout: req.body.amount
    }
    try {
        await makePayment(req.body.User_Id, paymentData);
        res.json(`payment for ${req.body.name} registered`)
    } catch (error) {
        res.json('payment registration failed')
    } finally {
        res.end()
    }
});

Student_Router.route('/pay_fee').post(async (req, res) => {
    const paymentData = {
        semester: req.body.semester,
        paymentMode: req.body.mode,
        amout: req.body.amount,
    }
    try {
        await payFee(req.body.user_Id, paymentData);
        res.json("Fee payment registered")
    } catch (error) {
        res.json("Error occured contact adminstration")
    } finally {
        res.end()
    }
});

export { Student_Router }