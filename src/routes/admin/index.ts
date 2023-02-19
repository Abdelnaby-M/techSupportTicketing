import {Application} from 'express';
import auth from './adminAuth';
import profile from './profile';
// import ticket from '../ticket/crud';
import userProfile from '../user/profile';


export default (baseUrl: string, app: Application)=>{

    app.use(baseUrl + '/auth', auth);
    app.use(baseUrl + '/profile', profile);
    app.use(baseUrl + '/userprofile', userProfile);

}