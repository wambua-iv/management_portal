import { Units } from "../models/units.models";
import { Hostel } from "../models/hostels.models"

// unit registration
export const UnitRegistration = async (Unit: any) => {
    const registeredUnits = {}
    const newUnits = new Units(Unit);
    await newUnits
        .save()
        .then((regUnit: any) => Object.assign(registeredUnits, { data: regUnit }))
        .catch((e: Error) => console.log(e))
    return registeredUnits;
}

// unit confirmation
export const checkUnits =async (user_Id: String) => {
    const checkedUnits = {}
   await Units.find({ user_Id: user_Id })
        .then((user) => {
            if(user) return Object.assign(checkedUnits, {data: user});
            console.log(user)
            throw new Error('no registered units')
        })
    .catch((e) =>{throw new Error(e)});
    return checkedUnits;
};

export const updateUnits = async() => true;



export const hostelRegistration = async(registration: {}) =>{
        const hostel = new Hostel(registration);
        await hostel.save().catch((e: any) => {throw new Error(e)} )
}

export const viewHostelRegistration =async (user_Id:String) => {
    const HostelStatus = {}
    await Hostel.find({ user_Id: user_Id })
         .then((user) => {
             if(user) return Object.assign(HostelStatus, {data: user});
             console.log(user)
             throw new Error('no registered units')
         })
     .catch((e) => console.log(e));
     return HostelStatus;
}