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
exports.salaryController = void 0;
const database_1 = __importDefault(require("../database"));
class SalaryController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const salaries = (yield (yield database_1.default).request().input("teacherId", req.params["teacherId"]).query('SELECT t.teacherId, u.firstName,u.fatherLastName,u.motherLastName, t.rfc, s.emissionDate,s.total FROM teachers t, salaries_report s, users  u WHERE s.teacherId = t.teacherId AND t.userId=u.userId AND s.teacherId=@teacherId')).recordset;
            res.json(salaries);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield database_1.default).request()
                .input("teacher", req.body["teacherId"])
                .input("fecha", req.body["fechaPago"])
                .input("horasTrabajadas", req.body["horasTrabajadas"])
                .execute('CalcularNominaQuincenal');
            console.log(req.body);
            res.json({ 'message': "Nómina Registrada" });
        });
    }
}
exports.salaryController = new SalaryController();
exports.default = exports.salaryController;
