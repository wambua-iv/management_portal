import mongoose from 'mongoose';
const unitsSchema = mongoose.Schema


const unitsModel = new unitsSchema(
    {
        names : {
            firstName: { type : String, required : true },
            lastName: { type : String, required : true },
                },
        user_id: {type: String, required: true},
        units: [{
                name: String,
                status : String
            }]
    },
    {
        timestamps: true
    }
)

export const Units = mongoose.models.Units_1 || mongoose.model('Units_1', unitsModel);