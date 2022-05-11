import {Request,Response} from 'express';
import pool from '../database';

class TeacherController{

    public async index(req:Request, res:Response ){
        const teachers = (await (await pool).query('SELECT teachers.teacherId, teachers.userId, teachers.rfc, teachers.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM teachers, users WHERE teachers.userId=users.userId')).recordset;
        res.json(teachers);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("email",req.body["email"])
        .input("rfc",req.body["rfc"])
        .input("hiringDate",req.body["hiringDate"])
        .execute('CrearTeacher');
        console.log(req.body);

        res.json({'message':"Nuevo Teacher Registrado"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("id",req.body["id"])
        .query('DELETE FROM teachers WHERE teacherId=@id');
        res.json({'message':'Eliminando a Teacher con matrícula '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("rfc",req.body["rfc"])
        .input("hiringDate",req.body["hiringDate"])
        .input("id",req.params["id"])
        .query('UPDATE teachers SET rfc=@rfc, hiringDate=@hiringDate WHERE teacherId=@id');
        console.log(req.body);
        res.json({'message':'Teacher con matrícula '+id+ ' Modificado'});
        
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;

        const teacher=(await(await pool)
        .request()
        .input("id",req.params["id"])
        .query('SELECT teachers.teacherId, teachers.userId, teachers.rfc, teachers.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM teachers, users WHERE teachers.userId=users.userId AND teacherId=@id')).recordset;

        if(teacher.length > 0){
            console.log(teacher[0]);
            return res.json(teacher[0]);
        }  
        else {
            res.status(404).json({'message':'Teacher no encontrado'});
        }
    }
}

export const teacherController=new TeacherController();
export default teacherController;