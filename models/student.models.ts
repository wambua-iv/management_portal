import mongoose from 'mongoose';
const studentSchema = mongoose.Schema;
const semesterSchema = mongoose.Schema;
const unitsSchema = mongoose.Schema;
const feeSchema = mongoose.Schema;
const paymentsSchena = mongoose.Schema;

const unitsModel = new unitsSchema(
    {
        name: String,
        results: {
            marks: String,
            grade: String,
            status: String
        }
    }
);


const semesterModel = new semesterSchema({
        semester: String,
        status: String,
        started: Date,
        units: [unitsModel]
    });


const feeModel = new feeSchema({
            semester: String,
            paymentMode: String,
            amout: Number,
            balance: Number
});
const paymentModel = new paymentsSchena({
        nameOfPayment: String,
        paymentMode: String,
        amout: Number
})

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
        semesters: [semesterModel],
        hostels: {
            hostel: String,
            request: { type: Number, max: 1 },
            registered: { type: Boolean, default: false },
            status: String,
        },
        fees: [feeModel],
        otherPayments:  [paymentModel]
    },
    {
        timestamps: true
    }
)

export const Students = mongoose.models.students_5 || mongoose.model('students_5', studentModel);