import { Router } from "express";
import screenController from "../controllers/screenController";

class ScreenRoutes{

    public router : Router = Router();

    constructor(){
        this.config()
    }

    config():void{

        this.router.get('/',screenController.index);
        this.router.post('/', screenController.create);
        this.router.delete('/:id',screenController.delete);
        this.router.put('/:id',screenController.update);
        this.router.get('/:id',screenController.details);
    }
}

const screenRoutes = new ScreenRoutes();
export default screenRoutes.router;