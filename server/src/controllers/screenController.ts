import {Request,Response} from 'express';
import pool from '../database';

class ScreenController{

    public async index(req:Request, res:Response ){
        const screens =(await(await pool).request().query('SELECT * FROM screen_control')).recordset;
        console.log(screens);
        res.json(screens);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("roleId",req.body["roleId"])
        .input("coordinators",req.body["coordinators"])
        .input("course_details",req.body["course_details"])
        .input("courses",req.body["courses"])
        .input("frequencies",req.body["frequencies"])
        .input("periods",req.body["periods"])
        .input("permission",req.body["permission"])
        .input("programs",req.body["programs"])
        .input("roles",req.body["roles"])
        .input("schedules",req.body["schedules"])
        .input("screens",req.body["screens"])
        .input("students",req.body["students"])
        .input("teachers",req.body["teachers"])
        .query('INSERT INTO screen_control (roleId, coordinators, course_details, courses, frequencies, periods, permission, programs, roles, schedules, screens, students, teachers) VALUES (@roleId, @coordinators, @course_details, @courses, @frequencies, @periods, @permission, @programs, @roles, @schedules, @screens, @students, @teachers)');
        console.log(req.body);
        res.json({'message':"Nuevos Permisos de Pantallas Registrados"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await (await pool).request().input("id", id).query('DELETE FROM screen_control WHERE roleId = @id');
        res.json({'message':'Eliminando permisos de pantallas ' + id});
    }

    
    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("id",id)
        .input("roleId",req.body["roleId"])
        .input("coordinators",req.body["coordinators"])
        .input("course_details",req.body["course_details"])
        .input("courses",req.body["courses"])
        .input("frequencies",req.body["frequencies"])
        .input("periods",req.body["periods"])
        .input("permission",req.body["permission"])
        .input("programs",req.body["programs"])
        .input("roles",req.body["roles"])
        .input("schedules",req.body["schedules"])
        .input("screens",req.body["screens"])
        .input("students",req.body["students"])
        .input("teachers",req.body["teachers"])
        .query('UPDATE screen_control SET roleId=@roleId, coordinators=@coordinators, course_details=@course_details, courses=@courses, frequencies=@frequencies, periods=@periods, permission=@permission, programs=@programs, roles=@roles, schedules=@schedules, screens=@screens, students=@students, teachers=@teachers WHERE roleId=@id');
        console.log(req.body);
        res.json({'message':'Permisos de Pantallas '+id+ ' Modificados'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const user= (await (await pool).request().input("id",req.params["id"]).query('SELECT * FROM screen_control WHERE roleId=@id')).recordset;

        if(user.length > 0){
            console.log(user[0]);
            return res.json(user[0]);
        }  
        else {
            res.status(404).json({'message':'Permisos de Pantallas no encontrados'});
        }
    }
}

export const screenController = new ScreenController();
export default screenController;