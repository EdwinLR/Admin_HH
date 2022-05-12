import { Router } from "express";
import permissionController from "../controllers/permissionController";

class PermissionRoutes{

    public router : Router = Router();

    constructor(){
        this.config()
    }

    config():void{

        this.router.get('/',permissionController.index);
        this.router.post('/', permissionController.create);
        this.router.delete('/:id',permissionController.delete);
        this.router.put('/:id',permissionController.update);
        this.router.get('/:id',permissionController.details);
    }
}

const permissionRoutes = new PermissionRoutes();
export default permissionRoutes.router;