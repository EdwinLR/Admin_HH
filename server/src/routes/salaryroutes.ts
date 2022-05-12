import {Router} from 'express';
import salaryController from '../controllers/salaryController';


class SalaryRoutes{

    public router:Router = Router();

    constructor(){
        this.config()
    }

    config():void{

        this.router.get('/:teacherId',salaryController.index);
        this.router.post('/', salaryController.create);
    }
}

const salaryRoutes=new SalaryRoutes();
export default salaryRoutes.router;