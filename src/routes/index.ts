import {Application, Router} from 'express';
// import ResponseUtils from '../utils/ResponseUtils';
import adminRouter from './admin/index';
import ticketRouter from './ticket/index';
import userRouter from './user/index';
import swagger from '../middlewares/swagger'

const routesIndex: Router = Router();


export default (baseUrl: string, app: Application)=>{

    app.use(baseUrl +  '/docs', swagger.server, swagger.setup); // Docs

    adminRouter(baseUrl + '/admin', app);
    ticketRouter(baseUrl + '/ticket', app);
    userRouter(baseUrl + '/user', app);
    

}