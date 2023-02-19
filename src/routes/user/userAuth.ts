import {Request, Response, NextFunction, Router} from 'express';
import { auth } from '../../services/auth';

const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction)=>{

    var status = await auth.login(req.body);
    res.json(status);
});

router.post('/resetlink', async (req: Request, res: Response, next: NextFunction)=>{

    var status = await auth.sendResetLink(req.body.email);
    res.json(status);
});

// router.get('/token/:token', async (req: Request, res: Response, next: NextFunction)=>{

//     var status = tokenVerification(req.params.token);
//     res.json(status);
// });

router.post('/resetPassword', async (req: Request, res: Response, next: NextFunction)=>{

    var status = await auth.resetPassword(req.body);
    res.json(status);
});


export default router;