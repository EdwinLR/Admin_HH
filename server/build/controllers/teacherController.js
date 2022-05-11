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
exports.teacherController = void 0;
const database_1 = __importDefault(require("../database"));
class TeacherController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = (yield (yield database_1.default).query('SELECT teachers.teacherId, teachers.userId, teachers.rfc, teachers.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM teachers, users WHERE teachers.userId=users.userId')).recordset;
            res.json(teachers);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).request()
                .input("email", req.body["email"])
                .input("rfc", req.body["rfc"])
                .input("hiringDate", req.body["hiringDate"])
                .execute('CrearTeacher');
            console.log(req.body);
            res.json({ 'message': "Nuevo Teacher Registrado" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("id", req.body["id"])
                .query('DELETE FROM teachers WHERE teacherId=@id');
            res.json({ 'message': 'Eliminando a Teacher con matrícula ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("rfc", req.body["rfc"])
                .input("hiringDate", req.body["hiringDate"])
                .input("id", req.params["id"])
                .query('UPDATE teachers SET rfc=@rfc, hiringDate=@hiringDate WHERE teacherId=@id');
            console.log(req.body);
            res.json({ 'message': 'Teacher con matrícula ' + id + ' Modificado' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const { id } = req.params;
            const teacher = (yield (yield database_1.default)
                .request()
                .input("id", req.params["id"])
                .query('SELECT teachers.teacherId, teachers.userId, teachers.rfc, teachers.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM teachers, users WHERE teachers.userId=users.userId AND teacherId=@id')).recordset;
            if (teacher.length > 0) {
                console.log(teacher[0]);
                return res.json(teacher[0]);
            }
            else {
                res.status(404).json({ 'message': 'Teacher no encontrado' });
            }
        });
    }
}
exports.teacherController = new TeacherController();
exports.default = exports.teacherController;
