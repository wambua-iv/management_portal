import express from 'express';
import { userVerification, 
                viewStudents, viewUsers, 
                ViewRegisteredUnits,
                updateSemesterStatus } from "../../../administration/index";


const adminRouter = express.Router();


adminRouter.route('/users').get(async (req, res) => {
    const users = await viewUsers()
    res.json(users)
})


adminRouter.route('/students').get(async (req, res) => {
    const users = await viewStudents()
    res.json(users)
})


adminRouter.route('/update_user').post(async (req, res) => {
    try {
        await userVerification(req.body.user_Id, req.body.account);
        res.json("user status updated");
    } catch (error: any) {
        res.json("user exists in the system")
        throw new Error(error)
    } finally {
        res.end()
    }
});


adminRouter.route('/view_registered_units').get(async(req, res) =>{
   const units = await ViewRegisteredUnits()
   res.json(units)
});

adminRouter.route('/semester_registration').post(async(req, res) =>{
   const semesterData = {
      user_Id : req.body.user_Id,
      status : req.body.status,
   }
   await updateSemesterStatus(semesterData)
});

adminRouter.route('payment_status').get(async(req,res)=>{

});

adminRouter.route('/make_payment').get(async(res,req) =>{

});

export{adminRouter}