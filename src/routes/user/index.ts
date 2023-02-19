import {Application} from 'express';
import auth from './userAuth';
import profile from './profile';

export default (baseUrl: string, app: Application)=>{

    app.use(baseUrl + '/auth', auth);
    app.use(baseUrl + '/profile', profile);

}