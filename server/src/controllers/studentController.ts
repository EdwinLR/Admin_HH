import {Request,Response} from 'express';
import pool from '../database';

class StudentController{

    public async index(req:Request, res:Response ){
        const students = (await (await pool).query('SELECT students.studentId, students.userId, students.admissionDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM students, users WHERE students.userId=users.userId')).recordset;
        res.json(students);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("email",req.body["email"])
        .input("admissionDate",req.body["admissionDate"])
        .execute('CrearEstudiante');
        console.log(req.body);
        res.json({'message':"Nuevo Estudiante Registrado"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("id",req.body["id"])
        .query('DELETE FROM students WHERE studentId=@id');
        res.json({'message':'Eliminando Estudiante con matrícula '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("admissionDate",req.body["admissionDate"])
        .input("id",req.params["id"])
        .query('UPDATE students SET admissionDate=@admissionDate WHERE studentId=@id');
        console.log(req.body);
        
        res.json({'message':'Estudiante con matrícula '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;

        const student=(await(await pool).request()
        .input("id",req.params["id"])
        .query('SELECT students.studentId, students.userId, students.admissionDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM students, users WHERE students.userId=users.userId AND students.studentId=@id')).recordset;

        if(student.length > 0){
            console.log(student[0]);
            return res.json(student[0]);
        }  
        else {
            res.status(404).json({'message':'Estudiante no encontrado'});
        }
    }

    public async getStudentbyMonth(req:Request, res:Response):Promise<any>
    {
        const {month} = req.params
        const {year} = req.params
        const students = (await (await pool)
        .request()
        .input("month",req.params["month"])
        .input("year",req.params["year"])
        .query('SELECT u.firstName, u.fatherLastName,u.motherLastName,u.email,u.phoneNumber, s.admissionDate FROM users as u, students as s WHERE (u.userId = s.userId) and MONTH(s.admissionDate) = @month and YEAR(s.admissionDate) = @year')).recordset;
        if(students.length == 0)
        {
            res.status(404).json({'message':'Estudiante(s) no encontrado(s)'});
        }
        else
        {
            res.json(students);
        }
    }
}

export const studentController=new StudentController();
export default studentController;