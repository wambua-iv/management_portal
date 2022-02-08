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
    const userAcc = {}
    await Users.find()
        .then(user => Object.assign(userAcc, { data: user }))
    return userAcc;
};


export const viewStudents = async () => {
    const userAcc = {}
    await Students.find()
        .then(user => Object.assign(userAcc, { data: user }))
    return userAcc;
};




export const ViewRegisteredUnits = async () => {
    const units = {}

    await Students.find()
        .then((data: any) => {
            data.forEach((element: any) => (
                element.semesters.forEach(async (elem: any) => {
                    if (elem.status == 'pending' || 'active') {
                        console.log(element)
                        Object.assign(units, {
                            names: element.names,
                            semesters: element.semesters,
                            user_Id: element.user_Id
                        })
                    }
                })
            ))
        })
        .catch((e: any) => { throw new Error(e) });
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


export const updateUnitsStatus = async () => {

};