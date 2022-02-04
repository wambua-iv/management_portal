import mongoose from 'mongoose';
const semesterSchema = mongoose.Schema


const semesterModel = new semesterSchema(
    {
        names : {
            firstName: { type : String, required : true },
            lastName: { type : String, required : true },
                },
        user_Id: {type: String, required: true, unique: true},
        semester: String,
        status : String,
    },
    {
        timestamps: true
    }
)

export const Semester = mongoose.models.semester_1 || mongoose.model('semester_1', semesterModel);