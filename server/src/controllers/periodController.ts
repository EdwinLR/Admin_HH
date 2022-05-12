import {Request,Response} from 'express';
import pool from '../database';

class SepPeriodController{

    public async index(req:Request, res:Response ){
        const sepPeriods = (await (await pool).query('SELECT * FROM periods')).recordset;
        res.json(sepPeriods);
    }

    public async create(req:Request, res:Response):Promise<void>{
        await (await pool).request().input("period",req.body["period"]).query('INSERT INTO periods (period) VALUES (@period)');
        console.log(req.body);
        res.json({'message':"Nuevo Periodo Registrado"});
        
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request().input("id",id).query('DELETE FROM periods WHERE periodId=@id');
        res.json({'message':'Eliminando Periodo '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request().input("id",id)
        .input("period",req.body["period"])
        .query('UPDATE periods SET period=@period WHERE periodId=@id');

        console.log(req.body);
        res.json({'message':'Periodo '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;
        const sep_period= (await (await pool).request().input("id",id).query('SELECT * FROM periods WHERE periodId=@id')).recordset;

        if(sep_period.length > 0){
            console.log(sep_period[0]);
            return res.json(sep_period[0]);
        }  
        else {
            res.status(404).json({'message':'Periodo no encontrado'});
        }
    }
}

export const sepPeriodController=new SepPeriodController();
export default sepPeriodController;