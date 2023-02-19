import {Request, Response, NextFunction, Router} from 'express';
import adminServices from '../../services/adminServices';
import authorize from '../../middlewares/authorization';

const router: Router = Router();

router.get('/:id', authorize(['admin']), async (req: Request, res: Response, next: NextFunction)=>{

    var requestedAdmin = await adminServices.getOne(req.params.uid);
    res.json(requestedAdmin);
});

router.get('/', async (req: Request, res: Response, next: NextFunction)=>{

    var requestedAdmins = await adminServices.getMany();
    res.json(requestedAdmins);
});

router.post('/', async (req: Request, res: Response, next: NextFunction)=>{

    var createdAdmin = await adminServices.create(req.body);
    res.json(createdAdmin);
});

router.patch('/:id', authorize(['admin']), async (req: Request, res: Response, next: NextFunction)=>{

    var updatedAdmin = await adminServices.update(req.body);
    res.json(updatedAdmin);
});

export default router;