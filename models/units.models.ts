import mongoose from 'mongoose';
const unitsSchema = mongoose.Schema


const unitsModel = new unitsSchema(
    {
        names : {
            firstName: { type : String, required : true },
            lastName: { type : String, required : true },
                },
        user_Id: {type: String, required: true},
        units: [{
                name: String,
                status : String
            }]
    },
    {
        timestamps: true
    }
)

export const Units = mongoose.models.Units_2 || mongoose.model('Units_2', unitsModel);