import { Students } from '../models'


// unit registration work on this later
// export const UnitRegistration = async (user_Id: String, units: any, title: String) => {
//     let message = "unit registration"
//     await Students.findOne({ user_Id: user_Id })
//         .then((data: any) => {
//             if (data.semesters.length > 0) {
//                 data.semesters.forEach(async (elem: any) => {
//                     if (elem.status == 'pending' || 'active' && elem.semester == title) {
//                         await Students.updateOne({ user_Id: data.user_Id},
//                             {
//                                 $set: {
//                                     semesters: [{
//                                         semester: elem.semester,
//                                         status: elem.status,
//                                         started: elem.started,
//                                         units: [...units]
//                                     }]
//                                 }
//                             }).then(() => message = "units registered");

//                     } else {
//                         return message = "incorrect semester units";
//                     }
//                 })
//             }   else {
//                     message = 'register semester';
//             }
//         }).catch((e: any) => {
//             console.log(e);
//             throw new Error(e)
//         })
//     return message;
// }



// unit confirmation //find way of combining with admin with HOC
export const checkUnits = async (user_Id: String) => {
    const units = {}

    await Students.findOne({ user_Id: user_Id })
        .then((data: any) => {
            data.semesters.forEach((elem: any) => {
                if (elem.status == 'pending' || 'active') {
                    console.log(elem)
                    Object.assign(units, {
                        names: data.names,
                        semesters: data.semesters,
                        user_Id: data.user_Id
                    })
                }
            })
        })
    console.log(units)
    return units;
}


export const registerSemester = async (semesterData: any) => {
    let message: String = "not registered"
    await Students.findOne({ user_Id: semesterData.user_Id })
        .then(async (data: any) => {
            if (data.semesters.length > 0) {
                console.log(data)
                data.semesters.forEach(async (element: any) => {
                    if (element.semester === semesterData.title) {
                        return message = "semester already registered"
                    } else {
                        await Students.updateOne({ user_Id: semesterData.user_Id },
                            {
                                $set: {
                                    semesters: [...data.semesters, {
                                        semester: semesterData.title,
                                        status: 'pending',
                                        started: semesterData.date,
                                        units: semesterData.units
                                    }]
                                }
                            })
                        return message = "semester registered"
                    }

                })
            } else {

                await Students.updateOne({ user_Id: semesterData.user_Id },
                    {
                        $set: {
                            semesters: {
                                semester: semesterData.title,
                                status: 'pending',
                                started: semesterData.date,
                                units: semesterData.units
                            }
                        }
                    })
                return message = "semester registered"
            }
        })
    return message;
}


export const hostelRegistration = async (user_Id: String) => {
    await Students.updateOne({ user_Id: user_Id },
        {
            $set: {
                hostels: {
                    request: 1,
                    registered: true,
                    status: 'pending',
                }
            }
        }).catch((e: any) => { throw new Error(e) })
}

export const viewHostelRegistration = async (user_Id: String) => {
    const HostelStatus = {}
    await Students.findOne({ user_Id: user_Id })
        .then((user: any) => {
            if (user) return Object.assign(HostelStatus,
                { hostel: user.hostels, student: user.names, Id: user.user_Id });
            throw new Error('no registered units')
        })
        .catch((e) => { throw new Error(e) });
    return HostelStatus;
}

export const payFee = async (user_Id: String, paymentData: any) => {
    await Students.updateOne({ user_Id: user_Id }, {
        $set: {
            fees: {
                semester: paymentData.semester,
                paymentMode: paymentData.mode,
                amout: paymentData.amount,
            }
        }
    })
        .catch((e: any) => { throw new Error(e) })
};

export const makePayment = async (user_Id: String, paymentData: any) => {
    await Students.updateOne({ user_Id: user_Id }, {
        $set: {
            otherPayment: {
                nameOfPayment: paymentData.name,
                paymentMode: paymentData.mode,
                amout: paymentData.amount
            }
        }
    })
};


export const viewFeePayments = async (user_Id: String) => {
    const payments = {}
    await Students.findOne({ user_Id: user_Id })
        .then((user: any) => {
            if (user) return Object.assign(payments,
                { fees: user.fees, student: user.names, user_Id: user.user_Id, });
            throw new Error('no registered units')
        })
        .catch((e) => { throw new Error(e) });
    return payments
};

export const viewPayments = async (user_Id: String) => {
    const payments = {}
    await Students.findOne({ user_Id: user_Id })
        .then((user: any) => {
            if (user) return Object.assign(payments,
                { otherPayments: user.fees, student: user.names, user_Id: user.user_Id, });
            throw new Error('no registered units')
        })
        .catch((e) => { throw new Error(e) });
    return payments
}

export const attendVideoConference = () =>{

};

export const viewCourseMaterial = () =>{

};