import express from 'express';
import { checkUnits, UnitRegistration } from '../../../students';


const Units_Router = express.Router();

Units_Router.route('/register').post(async(req,res)=>{
    const registeredUnits = {
        names : {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
                },
        user_id: req.body.user_Id,
        units: req.body.units
    };
    const pendingUnits = await UnitRegistration(registeredUnits);
    res.json(pendingUnits);
});

Units_Router.route('/check_units').get(async(req, res) =>{
    const searchParams = req.body.user_Id;
    const retrievedUnits = await checkUnits(searchParams);
    res.json(retrievedUnits);

});

export { Units_Router };