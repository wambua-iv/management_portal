import mongoose from 'mongoose';
const resultsSchema = mongoose.Schema


const resultsModel = new resultsSchema(
    {
        names : {
            firstName: String,
            lastName: String
                },
        user_id: {type: String, required: true},
        results: [{
                unit_name: String,
                results:{
                        marks: String,
                        grade : String,
                }
            }]
    },
    {
        timestamps: true
    }
)

export const Results = mongoose.models.results_1 || mongoose.model('results_1', resultsModel);