import {Request,Response} from 'express';
import pool from '../database';

class SalaryController{

    public async index(req:Request, res:Response ){
        const salaries =(await (await pool).request().input("teacherId",req.params["teacherId"]).query('SELECT t.teacherId, u.firstName,u.fatherLastName,u.motherLastName, t.rfc, s.emissionDate,s.total FROM teachers t, salaries_report s, users  u WHERE s.teacherId = t.teacherId AND t.userId=u.userId AND s.teacherId=@teacherId')).recordset;
        res.json(salaries);
    }
    
    public async create(req:Request, res:Response):Promise<void>{
        await (await pool).request()
        .input("teacher",req.body["teacherId"])
        .input("fecha",req.body["fechaPago"])
        .input("horasTrabajadas",req.body["horasTrabajadas"])
        .execute('CalcularNominaQuincenal');
        console.log(req.body);
        res.json({'message':"Nómina Registrada"});

    }
}


export const salaryController=new SalaryController();
export default salaryController;