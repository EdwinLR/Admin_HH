import {Request,Response} from 'express';
import pool from '../database';
import sql from 'mssql'

class CoordinatorController{

    public async index(req:Request, res:Response ){
        const coordinators = (await (await pool).query('SELECT coordinators.*, users.* FROM coordinators, users WHERE coordinators.userId=users.userId')).recordset;
        res.json(coordinators);
    }
    
    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("userId",req.body["userId"])
        .input("rfc",req.body["rfc"])
        .input("hiringDate",req.body["hiringDate"])
        .query('INSERT INTO coordinators (userId,rfc,hiringDate) VALUES (@userId, @rfc, @hiringDate)');
        console.log(req.body);
        res.json({'message':"Nuevo Coordinador Registrado"});
    }
    
    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request().input('id',req.params).query('DELETE FROM coordinators WHERE coordinatorId=@id');
        res.json({'message':'Eliminando a Coordinador con matrícula '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("userId",req.body["userId"])
        .input("rfc",req.body["rfc"])
        .input("hiringDate",req.body["hiringDate"])
        .input("id",req.params)
        .query('UPDATE coordinators SET userId=@userId, rfc=@rfc, hiringDate=@hiringDate WHERE coordinatorId=@id');
        console.log(req.body);
        res.json({'message':'Coordinador con matrícula '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const coordinator= (await pool).request().input("id",sql.SmallInt,req.params["id"]).query('SELECT coordinators.*, users.* FROM coordinators, users FROM coordinators.userId=users.userId AND coordinatorId=@id');

        if((await coordinator).recordsets.length > 0){
            console.log((await coordinator).recordsets[0]);
            return res.json((await coordinator).recordsets[0]);
        }  
        else {
            res.status(404).json({'message':'Coordinador no encontrado'});
        }
    }
}

export const coordinatorController=new CoordinatorController();
export default coordinatorController;