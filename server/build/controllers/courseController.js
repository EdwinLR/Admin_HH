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
exports.courseController = void 0;
const database_1 = __importDefault(require("../database"));
class CourseController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = (yield (yield database_1.default).query('SELECT c.crn,c.courseName,c.startingDate,f.frequency,s.startingTime, s.endingTime, u.firstName, u.fatherLastName, u.motherLastName, pr.program, p.period FROM courses c, frequencies f, schedules s, teachers t, programs pr, periods p, users u WHERE c.frequencyId=f.frequencyId AND c.scheduleId=s.scheduleId AND c.teacherId=t.teacherId AND c.programId=pr.programId AND c.periodId=p.periodId AND t.userId=u.userId')).recordset;
            res.json(courses);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).
                request()
                .input("courseName", req.body["courseName"])
                .input("startingDate", req.body["startingDate"])
                .input("frequencyId", req.body["frequencyId"])
                .input("scheduleId", req.body["scheduleId"])
                .input("programId", req.body["programId"])
                .input("periodId", req.body["periodId"])
                .input("teacherId", req.body["teacherId"])
                .query('INSERT INTO courses ( courseName, startingDate, frequencyId, scheduleId, programId, periodId, teacherId) VALUES ( @courseName, @startingDate, @frequencyId, @scheduleId, @programId, @periodId, @teacherId)');
            console.log(req.body);
            res.json({ 'message': "Nuevo Curso Registrado" });
        });
    }
    //M??todo para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default)
                .request()
                .input("id", id)
                .query('DELETE FROM courses WHERE crn=@id');
            res.json({ 'message': 'Eliminando Curso ' + id });
        });
    }
    //M??todo para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).
                request()
                .input("id", id)
                .input("courseName", req.body["courseName"])
                .input("startingDate", req.body["startingDate"])
                .input("frequencyId", req.body["frequencyId"])
                .input("scheduleId", req.body["scheduleId"])
                .input("programId", req.body["programId"])
                .input("periodId", req.body["periodId"])
                .input("teacherId", req.body["teacherId"])
                .query('UPDATE courses SET courseName=@courseName, startingDate=@startingDate, frequencyId=@frequencyId, scheduleId=@scheduleId, programId=@programId, periodId=@periodId, teacherId=@teacherId WHERE crn=@id');
            console.log(req.body);
            res.json({ 'message': 'Curso ' + id + ' Modificado' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const { id } = req.params;
            const course = (yield (yield database_1.default).request()
                .input("id", id).query('SELECT * FROM courses WHERE crn=@id')).recordset;
            if (course.length > 0) {
                console.log(course[0]);
                return res.json(course[0]);
            }
            else {
                res.status(404).json({ 'message': 'Estudiante no encontrado' });
            }
        });
    }
    detailsByTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const course = (yield (yield database_1.default).request()
                .input("userId", req.params['userId'])
                .query('SELECT c.crn,c.courseName,c.startingDate,f.frequency,s.startingTime, s.endingTime, u.firstName, u.fatherLastName, u.motherLastName, pr.program, p.period FROM courses c, frequencies f, schedules s, teachers t, programs pr, periods p, users u WHERE c.frequencyId=f.frequencyId AND c.scheduleId=s.scheduleId AND c.teacherId=t.teacherId AND c.programId=pr.programId AND c.periodId=p.periodId AND t.userId=u.userId AND c.teacherId IN (SELECT teacherId FROM teachers WHERE userId IN (SELECT userId FROM users WHERE email=@userId))')).recordset;
            res.json(course);
        });
    }
}
exports.courseController = new CourseController();
exports.default = exports.courseController;
