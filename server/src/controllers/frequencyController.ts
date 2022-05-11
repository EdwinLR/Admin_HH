import {Request,Response} from 'express';
import pool from '../database';
import sql from 'mssql';

class FrequencyController{

    public async index(req:Request, res:Response ){
        const frequencies =(await (await pool).query('SELECT * FROM frequencies')).recordset;
        res.json(frequencies);
    }

    public async create(req:Request, res:Response):Promise<void>{
        await (await pool).request().input("frequency",req.body["frequency"]).query('INSERT INTO frequencies VALUES (@frequency)');
        console.log(req.body);
        res.json({'message':"Nueva Frecuencia Registrada"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params
        await (await pool).request().input("id",req.params["id"]).query('DELETE FROM frequencies WHERE frequencyId=@id');
        res.json({'message':'Eliminando frequencia '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await (await pool).request().input("cuerpo",req.body["frequency"]).input("id",id).query('UPDATE frequencies SET frequency=@cuerpo WHERE frequencyId=@id');
        console.log(req.body);
        res.json({'message':'Frecuencia '+id+ ' Modificada'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        const frequency= (await(await pool).request().input("id",sql.SmallInt,req.params["id"]).query('SELECT * FROM frequencies WHERE frequencyId=@id')).recordset;

        if(frequency.length > 0){
            console.log(frequency[0]);
            return res.json(frequency[0]);
        }  
        else {
            res.status(404).json({'message':'Estudiante no encontrado'});
        }
    }
}

export const frequencyController=new FrequencyController();
export default frequencyController;