import {Request,Response} from 'express';
import pool from '../database';

class PermissionController{

    public async index(req:Request, res:Response ){
        const screens =(await(await pool).request().query('SELECT * FROM permission_control')).recordset;
        console.log(screens);
        res.json(screens);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request()
        .input("roleId",req.body["roleId"])
        .input("coordinatorsC",req.body["coordinatorsC"])
        .input("coordinatorsD",req.body["coordinatorsD"])
        .input("coordinatorsU",req.body["coordinatorsU"])
        .input("course_detailsC",req.body["course_detailsC"])
        .input("course_detailsD",req.body["course_detailsD"])
        .input("course_detailsU",req.body["course_detailsU"])
        .input("coursesC",req.body["coursesC"])
        .input("coursesD",req.body["coursesD"])
        .input("coursesU",req.body["coursesU"])
        .input("frequenciesC",req.body["frequenciesC"])
        .input("frequenciesD",req.body["frequenciesD"])
        .input("frequenciesU",req.body["frequenciesU"])
        .input("periodsC",req.body["periodsC"])
        .input("periodsD",req.body["periodsD"])
        .input("periodsU",req.body["periodsU"])
        .input("permissionsU",req.body["permissionsU"])
        .input("programsC",req.body["programsC"])
        .input("programsD",req.body["programsD"])
        .input("programsU",req.body["programsU"])
        .input("rolesC",req.body["rolesC"])
        .input("rolesD",req.body["rolesD"])
        .input("schedulesC",req.body["schedulesC"])
        .input("schedulesD",req.body["schedulesD"])
        .input("schedulesU",req.body["schedulesU"])
        .input("screensU",req.body["screensU"])
        .input("studentsC",req.body["studentsC"])
        .input("studentsD",req.body["studentsD"])
        .input("studentsU",req.body["studentsU"])
        .input("teachersC",req.body["teachersC"])
        .input("teachersD",req.body["teachersD"])
        .input("teachersU",req.body["teachersU"])
        .query('INSERT INTO permission_control (roleId, coordinatorsC, coordinatorsD, coordinatorsU, course_detailsC, course_detailsD, course_detailsU, coursesC, coursesD, coursesU, frequenciesC, frequenciesD, frequenciesU, periodsC, periodsD, periodsU, permissionsU, programsC, programsD, programsU, rolesC, rolesD, schedulesC, schedulesD, schedulesU, screensU, studentsC, studentsD, studentsU, teachersC, teachersD, teachersU) VALUES (@roleId, @coordinatorsC, @coordinatorsD, @coordinatorsU, @course_detailsC, @course_detailsD, @course_detailsU, @coursesC, @coursesD, @coursesU, @frequenciesC, @frequenciesD, @frequenciesU, @periodsC, @periodsD, @periodsU, @permissionsU, @programsC, @programsD, @programsU, @rolesC, @rolesD, @schedulesC, @schedulesD, @schedulesU, @screensU, @studentsC, @studentsD, @studentsU, @teachersC, @teachersD, @teachersU)');
        console.log(req.body);
        res.json({'message':"Nuevos Permisos Registrados"});
    }

    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await (await pool).request().input("id", id).query('DELETE FROM permission_control WHERE roleId = @id');
        res.json({'message':'Eliminando permisos ' + id});
    }

    
    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("id",id)
        .input("roleId",req.body["roleId"])
        .input("coordinatorsC",req.body["coordinatorsC"])
        .input("coordinatorsD",req.body["coordinatorsD"])
        .input("coordinatorsU",req.body["coordinatorsU"])
        .input("course_detailsC",req.body["course_detailsC"])
        .input("course_detailsD",req.body["course_detailsD"])
        .input("course_detailsU",req.body["course_detailsU"])
        .input("coursesC",req.body["coursesC"])
        .input("coursesD",req.body["coursesD"])
        .input("coursesU",req.body["coursesU"])
        .input("frequenciesC",req.body["frequenciesC"])
        .input("frequenciesD",req.body["frequenciesD"])
        .input("frequenciesU",req.body["frequenciesU"])
        .input("periodsC",req.body["periodsC"])
        .input("periodsD",req.body["periodsD"])
        .input("periodsU",req.body["periodsU"])
        .input("permissionsU",req.body["permissionsU"])
        .input("programsC",req.body["programsC"])
        .input("programsD",req.body["programsD"])
        .input("programsU",req.body["programsU"])
        .input("rolesC",req.body["rolesC"])
        .input("rolesD",req.body["rolesD"])
        .input("schedulesC",req.body["schedulesC"])
        .input("schedulesD",req.body["schedulesD"])
        .input("schedulesU",req.body["schedulesU"])
        .input("screensU",req.body["screensU"])
        .input("studentsC",req.body["studentsC"])
        .input("studentsD",req.body["studentsD"])
        .input("studentsU",req.body["studentsU"])
        .input("teachersC",req.body["teachersC"])
        .input("teachersD",req.body["teachersD"])
        .input("teachersU",req.body["teachersU"])
        .query('UPDATE permission_control SET roleId=@roleId, coordinatorsC=@coordinatorsC, coordinatorsD=@coordinatorsD, coordinatorsU=@coordinatorsU, course_detailsC=@course_detailsC, course_detailsD=@course_detailsD, course_detailsU=@course_detailsU, coursesC=@coursesC, coursesD=@coursesD, coursesU=@coursesU, frequenciesC=@frequenciesC, frequenciesD=@frequenciesD, frequenciesU=@frequenciesU, periodsC=@periodsC, periodsD=@periodsD, periodsU=@periodsU, permissionsU=@permissionsU, programsC=@programsC, programsD=@programsD, programsU=@programsU, rolesC=@rolesC, rolesD=@rolesD, schedulesC=@schedulesC, schedulesD=@schedulesD, schedulesU=@schedulesU, screensU=@screensU, studentsC=@studentsC, studentsD=@studentsD, studentsU=@studentsU, teachersC=@teachersC, teachersD=@teachersD, teachersU=@teachersU WHERE roleId=@id');
        console.log(req.body);
        res.json({'message':'Permisos '+id+ ' Modificados'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const user= (await (await pool).request().input("id",req.params["id"]).query('SELECT * FROM permission_control WHERE roleId=@id')).recordset;

        if(user.length > 0){
            console.log(user[0]);
            return res.json(user[0]);
        }  
        else {
            res.status(404).json({'message':'Permisos no encontrados'});
        }
    }
}

export const permissionController = new PermissionController();
export default permissionController;