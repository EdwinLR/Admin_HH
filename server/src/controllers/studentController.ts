import {Request,Response} from 'express';
import pool from '../database';

class StudentController{

    public async index(req:Request, res:Response ){
        const students = (await (await pool).query('SELECT students.*, users.* FROM students, users WHERE students.userId=users.userId')).recordset;
        res.json(students);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("userId",req.body["userId"])
        .input("admissionDate",req.body["admissionDate"])
        .query('INSERT INTO students (userId, admissionDate) VALUES (@userId, @admissionDate)');
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
        .input("userId",req.body["userId"])
        .input("admissionDate",req.body["admissionDate"])
        .input("id",id)
        .query('UPDATE students SET userId=@userId, admissionDate=@admissionDate WHERE studentId=@id');
        console.log(req.body);
        res.json({'message':'Estudiante con matrícula '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;

        const student=(await(await pool).request()
        .input("id",req.body["id"])
        .query('SELECT SELECT students.studentId, students.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM students, users WHERE students.userId=users.userId AND studentId=@id')).recordset;

        if(student.length > 0){
            console.log(student[0]);
            return res.json(student[0]);
        }  
        else {
            res.status(404).json({'message':'Estudiante no encontrado'});
        }
    }
}

export const studentController=new StudentController();
export default studentController;