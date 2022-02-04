import mongoose from 'mongoose';
const studentSchema = mongoose.Schema


const studentModel = new studentSchema(
    {
        names: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
        user_Id: { type: String, required: true },
        email: { type: String, unique: true },
        password: { type: String, required: true, minlength: 8 },
        accountType: { type: String }, //student, Lecturer, Admin
        verified: { type: Boolean, default: false },
        semesters: [{
            semester_title: String,
            status: String,
            started: Date,
            units: [{
                name: String,
                status: String,
                results: {
                    marks: String,
                    grade: String,
                    status: String
                }
            }]
        }],
        hostels: {
            hostel: String,
            request: { type: Number, max: 1 },
            registered: { type: Boolean, default: false },
            status: String,
        },
        fees: {
            paymentMode: String,
            Amoout: Number,
        },
        otherPayments: {
            nameOfPayment: String,
            paymentMode: String,
            Amout: Number
        }
    },
    {
        timestamps: true
    }
)

export const Students = mongoose.models.students_3 || mongoose.model('students_3', studentModel);