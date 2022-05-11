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
exports.studentController = void 0;
const database_1 = __importDefault(require("../database"));
class StudentController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = (yield (yield database_1.default).query('SELECT students.*, users.* FROM students, users WHERE students.userId=users.userId')).recordset;
            res.json(students);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).request()
                .input("userId", req.body["userId"])
                .input("admissionDate", req.body["admissionDate"])
                .query('INSERT INTO students (userId, admissionDate) VALUES (@userId, @admissionDate)');
            console.log(req.body);
            res.json({ 'message': "Nuevo Estudiante Registrado" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("id", req.body["id"])
                .query('DELETE FROM students WHERE studentId=@id');
            res.json({ 'message': 'Eliminando Estudiante con matrícula ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("userId", req.body["userId"])
                .input("admissionDate", req.body["admissionDate"])
                .input("id", id)
                .query('UPDATE students SET userId=@userId, admissionDate=@admissionDate WHERE studentId=@id');
            console.log(req.body);
            res.json({ 'message': 'Estudiante con matrícula ' + id + ' Modificado' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const { id } = req.params;
            const student = (yield (yield database_1.default).request()
                .input("id", req.body["id"])
                .query('SELECT SELECT students.studentId, students.hiringDate, users.firstName, users.fatherLastName, users.motherLastName, users.phoneNumber, users.email, users.photoUrl FROM students, users WHERE students.userId=users.userId AND studentId=@id')).recordset;
            if (student.length > 0) {
                console.log(student[0]);
                return res.json(student[0]);
            }
            else {
                res.status(404).json({ 'message': 'Estudiante no encontrado' });
            }
        });
    }
}
exports.studentController = new StudentController();
exports.default = exports.studentController;
