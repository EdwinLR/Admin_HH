import {Router} from 'express';
import {scheduleController} from '../controllers/scheduleController';

class ScheduleRoutes{

    public router:Router = Router();

    constructor(){
        this.config()
    }

    config():void{

        this.router.get('/',scheduleController.index);
        this.router.post('/', scheduleController.create);
        this.router.delete('/:id',scheduleController.delete);
        this.router.put('/:id',scheduleController.update);
        this.router.get('/:id',scheduleController.details);
    }
}

const scheduleRoutes=new ScheduleRoutes();
export default scheduleRoutes.router;