import mongoose from 'mongoose';
const feesSchema = mongoose.Schema;
const otherPaymentsSchema = mongoose.Schema;


const feesModel = new feesSchema({
    names: {
        firstName: String,
        lastName: String
    },
    user_id: { type: String, required: true },
    fees: {
        paymentMode: String,
        Amoout: Number,
    }
},
    {
        timestamps: true
    }
)

const otherPaymentsModel = new otherPaymentsSchema({
    names: {
        firstName: String,
        lastName: String
    },
    user_id: { type: String, required: true },
    otherPayments: {
        name: String,
        paymentMode: String,
        Amoout: Number
    }
},
    {
        timestamps: true
    }
)

export const OtherPayments = mongoose.models.otherPayments_1 || mongoose.model('otherPayments_1', otherPaymentsModel);
export const Fees = mongoose.models.fees_1 || mongoose.model('fees_1', feesModel);
