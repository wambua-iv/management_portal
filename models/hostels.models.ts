import mongoose from 'mongoose';
const hostelSchema = mongoose.Schema


const hostelModel = new hostelSchema(
    {
        names : {
            firstName: { type : String, required : true },
            lastName: { type : String, required : true },
                },
        user_Id: {type: String, required: true, unique: true},
        hostel: String,
        status : String,
    },
    {
        timestamps: true
    }
)

export const Hostel = mongoose.models.hostel_1 || mongoose.model('hostel_1', hostelModel);