import {Request, Response, NextFunction, Router} from 'express';
import  userServices  from '../../services/userServices';
import authorize from '../../middlewares/authorization';

const router: Router = Router();

router.get('/:id', authorize(['user']), async (req: Request, res: Response, next: NextFunction)=>{

    var requestedUser = await userServices.getUser(req.body.uid);
    res.json(requestedUser);
});

router.get('/', authorize(['admin']), async (req: Request, res: Response, next: NextFunction)=>{

    var requestedUsers = await userServices.getUsers();
    res.json(requestedUsers);
});

router.post('/', async (req: Request, res: Response, next: NextFunction)=>{

    var createdUser = await userServices.createUser(req.body);
    res.json(createdUser);
});

router.patch('/:id', authorize(['user']), async (req: Request, res: Response, next: NextFunction)=>{

    var updatedUser = await userServices.updateUser(req.body);
    res.json(updatedUser);
});

export default router;