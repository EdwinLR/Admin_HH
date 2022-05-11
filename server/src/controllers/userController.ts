import {Request,Response} from 'express';
import pool from '../database';

class UserController{

    public async index(req:Request, res:Response ){
        const users =(await(await pool).request().query('SELECT * FROM users')).recordset;
        console.log(users);
        res.json(users);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("roleId",req.body["roleId"])
        .input("firstName",req.body["firstName"])
        .input("fatherLastName",req.body["fatherLastName"])
        .input("motherLastName",req.body["motherLastName"])
        .input("email",req.body["email"])
        .input("phoneNumber",req.body["phoneNumber"])
        .input("password",req.body["password"])
        .input("photo",req.body["photoUrl"])
        .query('INSERT INTO users (firstName, fatherLastName, motherLastName, email, phoneNumber, password, roleId, photoUrl) VALUES (@firstName, @fatherLastName, @motherLastName, @email,@phoneNumber,@password, @roleId, @photo)');
        console.log(req.body);
        res.json({'message':"Nuevo Usuario Registrado"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await (await pool).request().input("id",id).query('DELETE FROM users WHERE userId=@id');
        res.json({'message':'Eliminando usuario '+id});
    }

    
    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("id",id)
        .input("roleId",req.body["roleId"])
        .input("firstName",req.body["firstName"])
        .input("fatherLastName",req.body["fatherLastName"])
        .input("motherLastName",req.body["motherLastName"])
        .input("email",req.body["email"])
        .input("phoneNumber",req.body["phoneNumber"])
        .input("password",req.body["password"])
        .input("photo",req.body["photoUrl"])
        .query('UPDATE users SET roleId=@roleId, firstName=@firstName, fatherLastName=@fatherLastName, motherLastName=@motherLastName, email=@email, phoneNumber=@phoneNumber, password=@password, photoUrl=@photo WHERE userId=@id');
        console.log(req.body);
        res.json({'message':'Usuario '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const user= (await (await pool).request().input("id",req.params["id"]).query('SELECT * FROM users WHERE userId=@id')).recordset;

        if(user.length > 0){
            console.log(user[0]);
            return res.json(user[0]);
        }  
        else {
            res.status(404).json({'message':'Usuario no encontrado'});
        }
    }
}

export const userController=new UserController();
export default userController;