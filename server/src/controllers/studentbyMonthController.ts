// import {Request,Response} from 'express';
// import pool from '../database';

// class StudentbyMonthController
// {
//     public async getStudentbyMonth(req:Request, res:Response):Promise<any>
//     {
//         const {month} = req.params
//         const {year} = req.params
//         const students = (await (await pool)
//         .request()
//         .input("month",req.params["month"])
//         .input("year",req.params["year"])
//         .query('SELECT u.firstName, u.fatherLastName,u.motherLastName,u.email,u.phoneNumber, s.admissionDate FROM users as u, students as s WHERE (u.userId = s.userId) and MONTH(s.admissionDate) = @Month and YEAR(s.admissionDate) = @Year')).recordset;
//         if(students.length == 0)
//         {
//             res.status(404).json({'message':'Estudiante(s) no encontrado(s)'});
//         }
//         else
//         {
//             res.json(students);
//         }
    
//     }
// }
// export const studentbyMonthController=new StudentbyMonthController();
// export default studentbyMonthController;