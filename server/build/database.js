"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const dbSettings = {
    user: 'localhost',
    password: '12345',
    server: 'localhost',
    database: 'BD_SistemaEscolar',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};
const pool = mssql_1.default.connect(dbSettings);
exports.default = pool;
