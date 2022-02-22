import { Students } from "../models";

export const createVideoConference = () => {

};


export const createCourseMaterial = () => {

};


///get student data taking a particular course
export const viewUnitStudents = async (unitCode: String) => {
    console.log(unitCode)
    const students = await Students.find({ "semesters": { "$elemMatch": { status: 'pending', " units": { "$elemMatch": {name: unitCode}} } } })
        .then((data: any) => data.map((el: any) => ({
            names: el.names, user_Id:
                el.user_Id,
                _id: el._id,
            semester: (el.semesters.flatMap((elem: any) => elem.units.filter((name: any) => name.name === unitCode)))
        })))
        console.log(students)
    return students
}


export const updateUnitsResults = async (unitData: any) => {
    await Students.findOne({ user_Id: unitData.user_Id })
        .then((data: any) => {
            console.log(data)
            const unit = data.semesters.flatMap((semesters: any) => {
                if (semesters.semester == unitData.semester) return semesters.units.flatMap((unit: any) => {
                    if (unit.name == unitData.name) {unit.results.status = unitData.status}
                })
            })
            console.log(unit)

            return data.save()
        })
        .catch((e: any) => console.log(e))
};