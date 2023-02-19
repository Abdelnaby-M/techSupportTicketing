import {Application} from 'express';
import crudRouter from './crud'

export default (baseUrl: string, app: Application)=>{

    app.use(baseUrl + '/crud', crudRouter);

}