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
exports.sepPeriodController = void 0;
const database_1 = __importDefault(require("../database"));
class SepPeriodController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sepPeriods = (yield (yield database_1.default).query('SELECT * FROM periods')).recordset;
            res.json(sepPeriods);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield database_1.default).request().input("period", req.body["period"]).query('INSERT INTO periods (period) VALUES (@period)');
            console.log(req.body);
            res.json({ 'message': "Nuevo Periodo Registrado" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request().input("id", id).query('DELETE FROM periods WHERE periodId=@id');
            res.json({ 'message': 'Eliminando Periodo ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).request().input("id", id)
                .input("period", req.body["period"])
                .query('UPDATE periods SET period=@period WHERE periodId=@id');
            console.log(req.body);
            res.json({ 'message': 'Periodo ' + id + ' Modificado' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Destructurando una parte del objeto de Javascript
            const { id } = req.params;
            const sep_period = (yield (yield database_1.default).request().input("id", id).query('SELECT * FROM periods WHERE periodId=@id')).recordset;
            if (sep_period.length > 0) {
                console.log(sep_period[0]);
                return res.json(sep_period[0]);
            }
            else {
                res.status(404).json({ 'message': 'Periodo no encontrado' });
            }
        });
    }
}
exports.sepPeriodController = new SepPeriodController();
exports.default = exports.sepPeriodController;
