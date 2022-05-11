import {Request,Response} from 'express';
import pool from '../database';

class ProgramController{

    public async index(req:Request, res:Response ){
        const programs = (await (await pool).query('SELECT * FROM programs')).recordset;
        res.json(programs);
    }

    public async create(req:Request, res:Response):Promise<void>{
        (await pool).request().input("program",req.body["program"]).query('INSERT INTO programs (program) VALUES (@program)');
        console.log(req.body);
        res.json({'message':"Nuevo Programa Registrado"});
    }
    
    //Método para eliminar un registro
    public async delete(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request().input("id",req.params["id"]).query('DELETE FROM programs WHERE programId=@id');
        res.json({'message':'Eliminando Programa '+id});
    }

    //Método para actualizar un registro
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        (await pool).request()
        .input("program",req.body["program"])
        .input("id",req.params["id"])
        .query('UPDATE programs SET program=@program WHERE programId=@id');
        console.log(req.body);
        res.json({'message':'Programa '+id+ ' Modificado'});
    }

    public async details(req:Request,res:Response):Promise<any>{
        //Destructurando una parte del objeto de Javascript
        const {id}=req.params;
        const program= (await (await pool).request().input("id",req.params["id"]).query('SELECT * FROM programs WHERE programId=@id')).recordset;

        if(program.length > 0){
            console.log(program[0]);
            return res.json(program[0]);
        }  
        else {
            res.status(404).json({'message':'Programa no encontrado'});
        }
    }
}

export const programController=new ProgramController();
export default programController;