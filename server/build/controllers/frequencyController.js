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
exports.frequencyController = void 0;
const database_1 = __importDefault(require("../database"));
const mssql_1 = __importDefault(require("mssql"));
class FrequencyController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const frequencies = (yield (yield database_1.default).query('SELECT * FROM frequencies')).recordset;
            res.json(frequencies);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield database_1.default).request().input("frequency", req.body["frequency"]).query('INSERT INTO frequencies VALUES (@frequency)');
            console.log(req.body);
            res.json({ 'message': "Nueva Frecuencia Registrada" });
        });
    }
    //Método para eliminar un registro
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).request().input("id", req.params["id"]).query('DELETE FROM frequencies WHERE frequencyId=@id');
            res.json({ 'message': 'Eliminando frequencia ' + id });
        });
    }
    //Método para actualizar un registro
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).request().input("cuerpo", req.body["frequency"]).input("id", id).query('UPDATE frequencies SET frequency=@cuerpo WHERE frequencyId=@id');
            console.log(req.body);
            res.json({ 'message': 'Frecuencia ' + id + ' Modificada' });
        });
    }
    details(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const frequency = (yield (yield database_1.default).request().input("id", mssql_1.default.SmallInt, req.params["id"]).query('SELECT * FROM frequencies WHERE frequencyId=@id')).recordset;
            if (frequency.length > 0) {
                console.log(frequency[0]);
                return res.json(frequency[0]);
            }
            else {
                res.status(404).json({ 'message': 'Estudiante no encontrado' });
            }
        });
    }
}
exports.frequencyController = new FrequencyController();
exports.default = exports.frequencyController;
