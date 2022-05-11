import {Request,Response} from 'express';
import pool from '../database';

class ScheduleController{

    public async index(req:Request, res:Response ){
        const schedules = (await (await pool).query('SELECT * FROM schedules')).recordset;
        res.json(schedules);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool)
        .request()
        .input("startingTime",req.body["startingTime"])
        .input("endingTime",req.body["endingTime"])
        .query('INSERT INTO schedules (startingTime, endingTime) VALUES (@startingTime,@endingTime)');
        console.log(req.body);
        res.json({'message':"Nuevo Horario Registrado"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("id",id)
        .query('DELETE FROM schedules WHERE scheduleId=@id');
        res.json({'message':'Eliminando Horario '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool)
        .request()
        .input("id",id)
        .input("startingTime",req.body["startingTime"])
        .input("endingTime",req.body["endingTime"])
        .query('UPDATE schedules SET startingTime=@startingTime, endingTime=@endingTime WHERE scheduleId=@id');
        console.log(req.body);
        res.json({'message':'Horario '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;
        const schedule= (await(await pool).request()
        .input("id",id)
        .query('SELECT * FROM schedules WHERE scheduleId=@id')).recordset;

        if(schedule.length > 0){
            console.log(schedule[0]);
            return res.json(schedule[0]);
        }  
        else {
            res.status(404).json({'message':'Horario no encontrado'});
        }
    }
}

export const scheduleController=new ScheduleController();
export default scheduleController;