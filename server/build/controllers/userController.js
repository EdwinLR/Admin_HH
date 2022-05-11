"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = (yield (yield database_1.default).request().query('SELECT * FROM users')).recordset;
            console.log(users);
            res.json(users);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).request()
                .input("roleId", req.body["roleId"])
                .input("firstName", req.body["firstName"])
                .input("fatherLastName", req.body["fatherLastName"])
                .input("motherLastName", req.body["motherLastName"])
                .input("email", req.body["email"])
                .input("phoneNumber", req.body["phoneNumber"])
                .input("password", req.body["password"])
                .input("photo", req.body["photoUrl"])
                .query('INSERT INTO users (firstName, fatherLastName, motherLastName, email, phoneNumber, password, roleId, photoUrl) VALUES (@firstName, @fatherLastName, @motherLastName, @email,@phoneNumber,@password, @roleId, @photo)');
            console.log(req.body);
            res.json({ 'message': "Nuevo Usuario Registrado" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).request().input("id", id).query('DELETE FROM users WHERE userId=@id');
            res.json({ 'message': 'Eliminando usuario ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("id", id)
                .input("roleId", req.body["roleId"])
                .input("firstName", req.body["firstName"])
                .input("fatherLastName", req.body["fatherLastName"])
                .input("motherLastName", req.body["motherLastName"])
                .input("email", req.body["email"])
                .input("phoneNumber", req.body["phoneNumber"])
                .input("password", req.body["password"])
                .input("photo", req.body["photoUrl"])
                .query('UPDATE users SET roleId=@roleId, firstName=@firstName, fatherLastName=@fatherLastName, motherLastName=@motherLastName, email=@email, phoneNumber=@phoneNumber, password=@password, photoUrl=@photo WHERE userId=@id');
            console.log(req.body);
            res.json({ 'message': 'Usuario ' + id + ' Modificado' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const user = (yield (yield database_1.default).request().input("id", req.params["id"]).query('SELECT * FROM users WHERE userId=@id')).recordset;
            if (user.length > 0) {
                console.log(user[0]);
                return res.json(user[0]);
            }
            else {
                res.status(404).json({ 'message': 'Usuario no encontrado' });
            }
        });
    }
}
exports.userController = new UserController();
exports.default = exports.userController;
