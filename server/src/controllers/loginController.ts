import { Request,Response } from "express";
import pool from '../database'

class LoginController
{
    public async getUserDetail (req:Request, res : Response): Promise<any>
    {
        const user = (await (await pool).request().input("email",req.params["email"]).query('SELECT * FROM users WHERE email = @email')).recordset
        res.json(user);
    }
}
export const loginController = new LoginController();
export default loginController