import { elementAcceptingRef } from '@mui/utils';
import { Students } from '../models';
import { Users } from '../models';

export const userVerification = async (user_Id: String, accountType: String) => {
    await Users.findOne({ user_Id: user_Id })
        .then(async () => {
            await Users.updateOne({ user_Id: user_Id }, {
                $set: {
                    verified: true,
                    accountType: accountType
                }
            }).catch((e: any) => { throw new Error(e) });

            if (accountType == 'lecturer') {
                return true;
            } else if (accountType == 'student') {
                try {
                    await Users.findOne({ user_Id: user_Id })
                        .then(async (user) => (
                            await Students.create({
                                user_Id: user.user_Id,
                                names: user.names,
                                verified: user.verified,
                                email: user.email,
                                password: user.password,
                                accountType: user.accountType
                            }).catch((e: any) => { throw new Error(e) })
                        )).catch((e: any) => { throw new Error(e) })
                } catch (error: any) { throw new Error(error) }
            } else if (accountType == 'administrator') {
                return true;
            } else {
                throw new Error(' user account type is undefined');
            }
        }
        )

        .catch((e: any) => { throw new Error(e) })
};


export const viewUsers = async () => {
    const userAcc = await Users.find()
    return userAcc;
};


export const viewStudents = async () => {
    const userAcc = await Students.find()
    return userAcc;
};


export const ViewRegisteredUnits = async (semester: String) => {
    const units = await Students.find({ "semesters": { "$elemMatch": { "semester": semester } } })
        .then((data: any) => data.map((el: any) => ({
            names: el.names, user_Id:
                el.user_Id,
            semester: (el.semesters.filter((elem: any) => elem.semester == semester))
        })))
        .catch((e: any) => { throw new Error(e) });
    console.log(units)
    return units;
};

export const updateSemesterStatus = async (semesterData: any) => {
    await Students.findOne({ user_Id: semesterData.user_Id })
        .then((data: []) => {
            data.forEach(async (elem: any) => {
                if (elem.semesters?.status == 'pending') {
                    console.log(data)
                    await Students.updateOne({ semesters: { semester_title: semesterData.title } },
                        { $set: { semesters: { status: semesterData.status } } }
                    ).then(sem => console.log(sem))
                        .catch((e: any) => { throw new Error(e) });
                }
            })
        }).catch((e: any) => { throw new Error(e) });
};


export const viewPayments = async (paymentType: String) => {
    const feeDetails = await Students.find({ "fees": { "$elemMatch": { "status": 'pending'} } })
        .then((data: any) => data.filter((elem: any) => elem.fees.length > 0 ? data : "fee"))
        .then((data: any) => data.map((el: any) => ({
            names: el.names, user_Id:
                el.user_Id,
            fees : el.fees
        })))

    const otherPayments = await Students.find({ "otherPayments": { "$elemMatch": { "status": 'pending' } } })
        .then((data: any) => data.map((elem: any) => elem.otherPayments.length > 0 ? data : "ther"));

    return paymentType == 'fees' ? feeDetails : otherPayments;
};


export const verifyFeePayment = async (paymentData: any) => {
    await Students.findOne({ user_Id: paymentData.user_Id })
        .then((data: any) => {
            const payment = data.fees.filter((elem: any) => elem.semester == paymentData.semester)[0];
            console.log(payment)
            payment.status = paymentData.status;
            return data.save()
        })
        .catch((e: any) => console.log(e))
};


export const verifyOtherPayment = async (paymentData: any) => {
    await Students.findOne({ user_Id: paymentData.user_Id })
        .then((data: any) => {
            const payment = data.otherPayments.map((elem: any) => elem.nameOfPayment == paymentData.name ? elem : null)[0];
            console.log(payment)
            payment.status = paymentData.status;
            //payment.balance = Number(paymentData.expected - payment.amount);
            return data.save()
        })
        .catch((e: any) => console.log(e))
};

export const verifyResults = async (user_Id: String) => {

};