"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const screenController_1 = __importDefault(require("../controllers/screenController"));
class ScreenRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', screenController_1.default.index);
        this.router.post('/', screenController_1.default.create);
        this.router.delete('/:id', screenController_1.default.delete);
        this.router.put('/:id', screenController_1.default.update);
        this.router.get('/:id', screenController_1.default.details);
    }
}
const screenRoutes = new ScreenRoutes();
exports.default = screenRoutes.router;
