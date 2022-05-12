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
exports.screenController = void 0;
const database_1 = __importDefault(require("../database"));
class ScreenController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const screens = (yield (yield database_1.default).request().query('SELECT * FROM screen_control')).recordset;
            console.log(screens);
            res.json(screens);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).request()
                .input("roleId", req.body["roleId"])
                .input("coordinators", req.body["coordinators"])
                .input("course_details", req.body["course_details"])
                .input("courses", req.body["courses"])
                .input("frequencies", req.body["frequencies"])
                .input("periods", req.body["periods"])
                .input("permission", req.body["permission"])
                .input("programs", req.body["programs"])
                .input("roles", req.body["roles"])
                .input("schedules", req.body["schedules"])
                .input("screens", req.body["screens"])
                .input("students", req.body["students"])
                .input("teachers", req.body["teachers"])
                .query('INSERT INTO screen_control (roleId, coordinators, course_details, courses, frequencies, periods, permission, programs, roles, schedules, screens, students, teachers) VALUES (@roleId, @coordinators, @course_details, @courses, @frequencies, @periods, @permission, @programs, @roles, @schedules, @screens, @students, @teachers)');
            console.log(req.body);
            res.json({ 'message': "Nuevos Permisos de Pantallas Registrados" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).request().input("id", id).query('DELETE FROM screen_control WHERE roleId = @id');
            res.json({ 'message': 'Eliminando permisos de pantallas ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("id", id)
                .input("roleId", req.body["roleId"])
                .input("coordinators", req.body["coordinators"])
                .input("course_details", req.body["course_details"])
                .input("courses", req.body["courses"])
                .input("frequencies", req.body["frequencies"])
                .input("periods", req.body["periods"])
                .input("permission", req.body["permission"])
                .input("programs", req.body["programs"])
                .input("roles", req.body["roles"])
                .input("schedules", req.body["schedules"])
                .input("screens", req.body["screens"])
                .input("students", req.body["students"])
                .input("teachers", req.body["teachers"])
                .query('UPDATE screen_control SET roleId=@roleId, coordinators=@coordinators, course_details=@course_details, courses=@courses, frequencies=@frequencies, periods=@periods, permission=@permission, programs=@programs, roles=@roles, schedules=@schedules, screens=@screens, students=@students, teachers=@teachers WHERE roleId=@id');
            console.log(req.body);
            res.json({ 'message': 'Permisos de Pantallas ' + id + ' Modificados' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const user = (yield (yield database_1.default).request().input("id", req.params["id"]).query('SELECT * FROM screen_control WHERE roleId=@id')).recordset;
            if (user.length > 0) {
                console.log(user[0]);
                return res.json(user[0]);
            }
            else {
                res.status(404).json({ 'message': 'Permisos de Pantallas no encontrados' });
            }
        });
    }
}
exports.screenController = new ScreenController();
exports.default = exports.screenController;
