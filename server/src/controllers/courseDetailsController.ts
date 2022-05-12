import {Request,Response} from 'express';
import pool from '../database';

class StudentsCoursesController{

    public async index(req:Request, res:Response ){
        const {id} = req.params;
        const lists =(await (await pool).request().input("id",id).query('SELECT cs.courseId, c.courseName,f.frequency,p.program,sch.startingTime, sch.endingTime,sp.period,cs.studentId,cs.wq_1,cs.wq_2,cs.wq_3,cs.oq_1,cs.oq_2,cs.oq_3,cs.cp_1,cs.cp_2,cs.cp_3,cs.final_project,cs.final_grade FROM course_details AS cs, students AS s,courses AS c,frequencies f,programs p, schedules sch,periods sp WHERE cs.courseId = @id AND cs.courseId=c.crn AND cs.studentId=s.studentId AND c.frequencyId=f.frequencyId AND c.scheduleId=sch.scheduleId AND c.programId=p.programId AND c.periodId=sp.periodId')).recordset;
        res.json(lists);
    }

    public async list(req:Request, res:Response ){
        const lists = (await(await pool).query('SELECT cs.courseId, c.courseName,f.frequency,p.program,sch.startingTime, sch.endingTime,sp.period,cs.studentId,cs.wq_1,cs.wq_2,cs.wq_3,cs.oq_1,cs.oq_2,cs.oq_3,cs.cp_1,cs.cp_2,cs.cp_3,cs.final_project,cs.final_grade FROM course_details AS cs, students AS s,courses AS c,frequencies f,programs p, schedules sch,periods sp WHERE cs.courseId=c.crn AND cs.studentId=s.studentId AND c.frequencyId=f.frequencyId AND c.scheduleId=sch.scheduleId AND c.programId=p.programId AND c.periodId=sp.periodId')).recordset;
        res.json(lists);
    }
    
    public async create(req:Request, res:Response):Promise<void>{
        (await pool)
        .request()
        .input("courseId",req.body["courseId"])
        .input("studentId",req.body["studentId"])
        .query('INSERT INTO course_details (courseId, studentId) VALUES (@courseId, @studentId)');
        console.log(req.body);
        res.json({'message':"Nueva Lista de Calificaciones Creada"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request().input("id",id).query('DELETE FROM course_details WHERE studentId=@id');
        res.json({'message':'Eliminando Lista de Calificaciones del curso '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        console.log(req.body);
        (await pool)
        .request()
        .input("id",id)
        .input("wq1",req.body["WQ_1"])
        .input("wq2",req.body["WQ_2"])
        .input("wq3",req.body["WQ_3"])
        .input("oq1",req.body["OQ_1"])
        .input("oq2",req.body["OQ_2"])
        .input("oq3",req.body["OQ_3"])
        .input("cp1",req.body["CP_1"])
        .input("cp2",req.body["CP_2"])
        .input("cp3",req.body["CP_3"])
        .input("finalProject",req.body["final_Project"])
        .input("finalGrade",req.body["final_Grade"])
        .query('UPDATE course_details SET WQ_1=@wq1,WQ_2=@wq2, WQ_3=@wq3,OQ_1=@oq1,OQ_2=@oq2,OQ_3=@oq3,WQ_1=@wq1,CP_1=@cp1,CP_2=@cp2,CP_3=@cp3,final_Project=@finalProject,final_Grade=@finalGrade WHERE studentId=@id');
        res.json({'message':'Eliminando Lista de Calificaciones del curso '+id+ ' Modificada'});

    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;
        const list = (await(await pool).request().input("id",id).query('SELECT sc.studentId, sc.courseId, sc.WQ_1, sc.WQ_2, sc.WQ_3, sc.OQ_1, sc.OQ_2, sc.OQ_3, sc.CP_1, sc.CP_2, sc.CP_3, sc.final_Project, sc.final_Grade FROM course_details AS sc, courses AS c, students AS s WHERE sc.studentId = s.studentId AND sc.courseId = c.crn AND sc.studentId = @id')).recordset;

        if(list.length > 0){
            console.log(list[0]);
            return res.json(list[0]);
        }  
        else {
            res.status(404).json({'message':'Estudiante no encontrado'});
        }
    }
}

export const studentsCoursesController=new StudentsCoursesController();
export default studentsCoursesController;