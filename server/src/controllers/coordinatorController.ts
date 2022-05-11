import {Request,Response} from 'express';
import pool from '../database';
import sql from 'mssql'

class CoordinatorController{

    public async index(req:Request, res:Response ){
        const coordinators = (await (await pool).query('SELECT coordinators.coordinatorId, coordinators.userId, coordinators.rfc, coordinators.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM coordinators, users WHERE coordinators.userId=users.userId')).recordset;
        res.json(coordinators);
    }
    
    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("email",req.body["email"])
        .input("rfc",req.body["rfc"])
        .input("hiringDate",req.body["hiringDate"])
        .execute('CrearCoordinador');
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
        .input("id",req.params["id"])
        .query('UPDATE coordinators SET userId=@userId, rfc=@rfc, hiringDate=@hiringDate WHERE coordinatorId=@id');
        console.log(req.body);
        res.json({'message':'Coordinador con matrícula '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const coordinator= (await(await pool).request().input("id",req.params["id"]).query('SELECT coordinators.coordinatorId, coordinators.userId, coordinators.rfc, coordinators.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM coordinators, users WHERE coordinators.userId=users.userId AND coordinators.coordinatorId=@id')).recordset;

        if(coordinator.length > 0){
            console.log(coordinator[0]);
            return res.json(coordinator[0]);
        }  
        else {
            res.status(404).json({'message':'Teacher no encontrado'});
        }
    }
}

export const coordinatorController=new CoordinatorController();
export default coordinatorController;