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
exports.permissionController = void 0;
const database_1 = __importDefault(require("../database"));
class PermissionController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const screens = (yield (yield database_1.default).request().query('SELECT * FROM permission_control')).recordset;
            console.log(screens);
            res.json(screens);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).request()
                .input("roleId", req.body["roleId"])
                .input("coordinatorsC", req.body["coordinatorsC"])
                .input("coordinatorsD", req.body["coordinatorsD"])
                .input("coordinatorsU", req.body["coordinatorsU"])
                .input("course_detailsC", req.body["course_detailsC"])
                .input("course_detailsD", req.body["course_detailsD"])
                .input("course_detailsU", req.body["course_detailsU"])
                .input("coursesC", req.body["coursesC"])
                .input("coursesD", req.body["coursesD"])
                .input("coursesU", req.body["coursesU"])
                .input("frequenciesC", req.body["frequenciesC"])
                .input("frequenciesD", req.body["frequenciesD"])
                .input("frequenciesU", req.body["frequenciesU"])
                .input("periodsC", req.body["periodsC"])
                .input("periodsD", req.body["periodsD"])
                .input("periodsU", req.body["periodsU"])
                .input("permissionsU", req.body["permissionsU"])
                .input("programsC", req.body["programsC"])
                .input("programsD", req.body["programsD"])
                .input("programsU", req.body["programsU"])
                .input("rolesC", req.body["rolesC"])
                .input("rolesD", req.body["rolesD"])
                .input("schedulesC", req.body["schedulesC"])
                .input("schedulesD", req.body["schedulesD"])
                .input("schedulesU", req.body["schedulesU"])
                .input("screensU", req.body["screensU"])
                .input("studentsC", req.body["studentsC"])
                .input("studentsD", req.body["studentsD"])
                .input("studentsU", req.body["studentsU"])
                .input("teachersC", req.body["teachersC"])
                .input("teachersD", req.body["teachersD"])
                .input("teachersU", req.body["teachersU"])
                .query('INSERT INTO permission_control (roleId, coordinatorsC, coordinatorsD, coordinatorsU, course_detailsC, course_detailsD, course_detailsU, coursesC, coursesD, coursesU, frequenciesC, frequenciesD, frequenciesU, periodsC, periodsD, periodsU, permissionsU, programsC, programsD, programsU, rolesC, rolesD, schedulesC, schedulesD, schedulesU, screensU, studentsC, studentsD, studentsU, teachersC, teachersD, teachersU) VALUES (@roleId, @coordinatorsC, @coordinatorsD, @coordinatorsU, @course_detailsC, @course_detailsD, @course_detailsU, @coursesC, @coursesD, @coursesU, @frequenciesC, @frequenciesD, @frequenciesU, @periodsC, @periodsD, @periodsU, @permissionsU, @programsC, @programsD, @programsU, @rolesC, @rolesD, @schedulesC, @schedulesD, @schedulesU, @screensU, @studentsC, @studentsD, @studentsU, @teachersC, @teachersD, @teachersU)');
            console.log(req.body);
            res.json({ 'message': "Nuevos Permisos Registrados" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).request().input("id", id).query('DELETE FROM permission_control WHERE roleId = @id');
            res.json({ 'message': 'Eliminando permisos ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request()
                .input("id", id)
                .input("roleId", req.body["roleId"])
                .input("coordinatorsC", req.body["coordinatorsC"])
                .input("coordinatorsD", req.body["coordinatorsD"])
                .input("coordinatorsU", req.body["coordinatorsU"])
                .input("course_detailsC", req.body["course_detailsC"])
                .input("course_detailsD", req.body["course_detailsD"])
                .input("course_detailsU", req.body["course_detailsU"])
                .input("coursesC", req.body["coursesC"])
                .input("coursesD", req.body["coursesD"])
                .input("coursesU", req.body["coursesU"])
                .input("frequenciesC", req.body["frequenciesC"])
                .input("frequenciesD", req.body["frequenciesD"])
                .input("frequenciesU", req.body["frequenciesU"])
                .input("periodsC", req.body["periodsC"])
                .input("periodsD", req.body["periodsD"])
                .input("periodsU", req.body["periodsU"])
                .input("permissionsU", req.body["permissionsU"])
                .input("programsC", req.body["programsC"])
                .input("programsD", req.body["programsD"])
                .input("programsU", req.body["programsU"])
                .input("rolesC", req.body["rolesC"])
                .input("rolesD", req.body["rolesD"])
                .input("schedulesC", req.body["schedulesC"])
                .input("schedulesD", req.body["schedulesD"])
                .input("schedulesU", req.body["schedulesU"])
                .input("screensU", req.body["screensU"])
                .input("studentsC", req.body["studentsC"])
                .input("studentsD", req.body["studentsD"])
                .input("studentsU", req.body["studentsU"])
                .input("teachersC", req.body["teachersC"])
                .input("teachersD", req.body["teachersD"])
                .input("teachersU", req.body["teachersU"])
                .query('UPDATE permission_control SET roleId=@roleId, coordinatorsC=@coordinatorsC, coordinatorsD=@coordinatorsD, coordinatorsU=@coordinatorsU, course_detailsC=@course_detailsC, course_detailsD=@course_detailsD, course_detailsU=@course_detailsU, coursesC=@coursesC, coursesD=@coursesD, coursesU=@coursesU, frequenciesC=@frequenciesC, frequenciesD=@frequenciesD, frequenciesU=@frequenciesU, periodsC=@periodsC, periodsD=@periodsD, periodsU=@periodsU, permissionsU=@permissionsU, programsC=@programsC, programsD=@programsD, programsU=@programsU, rolesC=@rolesC, rolesD=@rolesD, schedulesC=@schedulesC, schedulesD=@schedulesD, schedulesU=@schedulesU, screensU=@screensU, studentsC=@studentsC, studentsD=@studentsD, studentsU=@studentsU, teachersC=@teachersC, teachersD=@teachersD, teachersU=@teachersU WHERE roleId=@id');
            console.log(req.body);
            res.json({ 'message': 'Permisos ' + id + ' Modificados' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const user = (yield (yield database_1.default).request().input("id", req.params["id"]).query('SELECT * FROM permission_control WHERE roleId=@id')).recordset;
            if (user.length > 0) {
                console.log(user[0]);
                return res.json(user[0]);
            }
            else {
                res.status(404).json({ 'message': 'Permisos no encontrados' });
            }
        });
    }
}
exports.permissionController = new PermissionController();
exports.default = exports.permissionController;
