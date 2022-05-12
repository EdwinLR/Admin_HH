"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissionController_1 = __importDefault(require("../controllers/permissionController"));
class PermissionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', permissionController_1.default.index);
        this.router.post('/', permissionController_1.default.create);
        this.router.delete('/:id', permissionController_1.default.delete);
        this.router.put('/:id', permissionController_1.default.update);
        this.router.get('/:id', permissionController_1.default.details);
    }
}
const permissionRoutes = new PermissionRoutes();
exports.default = permissionRoutes.router;
