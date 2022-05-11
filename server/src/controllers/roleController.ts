import {Request,Response} from 'express';
import pool from '../database';

class RoleController{

    public async index(req:Request, res:Response ){
        const roles = (await (await pool).query('SELECT * FROM roles')).recordset;
        res.json(roles);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request().input("role",req.body["role"]).query('INSERT INTO roles (roleName) VALUES (@role)');
        console.log(req.body);
        res.json({'message':"Nuevo Rol Registrado"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request().input("id",req.params["id"]).query('DELETE FROM roles WHERE roleId=@id');
        res.json({'message':'Eliminando Rol '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("role",req.body["role"])
        .input("id",req.params["id"])
        .query('UPDATE roles SET roleName=@role WHERE roleId=@id');
        console.log(req.body);
        res.json({'message':'Rol '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;
        const role= (await (await pool).request().input("id",req.params["id"]).query('SELECT * FROM roles WHERE roleId=@id')).recordset;

        if(role.length > 0){
            console.log(role[0]);
            return res.json(role[0]);
        }  
        else {
            res.status(404).json({'message':'Rol no encontrado'});
        }
    }
}

export const roleController=new RoleController();
export default roleController;