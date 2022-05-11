import {Request,Response} from 'express';
import pool from '../database';

class CourseController{

    public async index(req:Request, res:Response ){
        const courses = (await(await pool).query('SELECT c.crn,c.courseName,c.startingDate,f.frequency,s.startingTime, s.endingTime, u.firstName, u.fatherLastName, u.motherLastName, pr.program, p.period FROM courses c, frequencies f, schedules s, teachers t, programs pr, periods p, users u WHERE c.frequencyId=f.frequencyId AND c.scheduleId=s.scheduleId AND c.teacherId=t.teacherId AND c.programId=pr.programId AND c.periodId=p.periodId AND t.userId=u.userId')).recordset;
        res.json(courses);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).
        request()
        .input("courseName",req.body["courseName"])
        .input("startingDate",req.body["startingDate"])
        .input("frequencyId",req.body["frequencyId"])
        .input("scheduleId",req.body["scheduleId"])
        .input("programId",req.body["programId"])
        .input("periodId",req.body["periodId"])
        .input("teacherId",req.body["teacherId"])
        .query('INSERT INTO courses ( courseName, startingDate, frequencyId, scheduleId, programId, periodId, teacherId) VALUES ( @courseName, @startingDate, @frequencyId, @scheduleId, @programId, @periodId, @teacherId)');
        console.log(req.body);
        res.json({'message':"Nuevo Curso Registrado"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool)
        .request()
        .input("id",id)
        .query('DELETE FROM courses WHERE crn=@id');
        res.json({'message':'Eliminando Curso '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).
        request()
        .input("id",id)
        .input("courseName",req.body["courseName"])
        .input("startingDate",req.body["startingDate"])
        .input("frequencyId",req.body["frequencyId"])
        .input("scheduleId",req.body["scheduleId"])
        .input("programId",req.body["programId"])
        .input("periodId",req.body["periodId"])
        .input("teacherId",req.body["teacherId"])
        .query('UPDATE courses SET courseName=@courseName, startingDate=@startingDate, frequencyId=@frequencyId, scheduleId=@scheduleId, programId=@programId, periodId=@periodId, teacherId=@teacherId WHERE crn=@id');
        console.log(req.body);
        res.json({'message':'Curso '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;
        const course= (await(await pool).request()
        .input("id",id).query('SELECT * FROM courses WHERE crn=@id')).recordset;

        if(course.length > 0){
            console.log(course[0]);
            return res.json(course[0]);
        }  
        else {
            res.status(404).json({'message':'Estudiante no encontrado'});
        }
    }
}

export const courseController=new CourseController();
export default courseController;