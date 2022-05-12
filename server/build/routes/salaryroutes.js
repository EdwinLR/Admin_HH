"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salaryController_1 = __importDefault(require("../controllers/salaryController"));
class SalaryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:teacherId', salaryController_1.default.index);
        this.router.post('/', salaryController_1.default.create);
    }
}
const salaryRoutes = new SalaryRoutes();
exports.default = salaryRoutes.router;
