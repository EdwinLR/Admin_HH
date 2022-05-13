import { Router } from "express";
import {courseController} from "../controllers/courseController";

class CourseRoutes{

    public router:Router = Router();

    constructor(){
        this.config()
    }

    config():void{

        this.router.get('/',courseController.index);
        this.router.post('/', courseController.create);
        this.router.delete('/:id',courseController.delete);
        this.router.put('/:id',courseController.update);
        this.router.get('/:id',courseController.details);
        this.router.get('/:userId/:roleId',courseController.detailsByTeacher);
    }
}

const courseRoutes=new CourseRoutes();
export default courseRoutes.router;