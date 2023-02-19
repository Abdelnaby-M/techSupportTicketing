import {Request, Response, NextFunction, Router} from 'express';
import ticketServices from '../../services/ticketServices';
import authorize from '../../middlewares/authorization';

const router: Router = Router();

router.put('/:uid', authorize(['user']), async (req: Request, res: Response, next: NextFunction)=>{

    var requestedTicket = await ticketServices.getOne(req.body.uid, req.body.userId);
    res.json(requestedTicket);
});

router.get('/', authorize(['admin']), async (req: Request, res: Response, next: NextFunction)=>{

    var requestedTickets = await ticketServices.getMany();
    res.json(requestedTickets);
});

router.put('/mytickets', authorize(['user']), async (req: Request, res: Response, next: NextFunction)=>{

    var requestedTickets = await ticketServices.getMytickets(req.body.userId);
    res.json(requestedTickets);
});

router.post('/', authorize(['admin']), async (req: Request, res: Response, next: NextFunction)=>{

    var createdTicket = await ticketServices.create(req.body);
    res.json(createdTicket);
});


router.patch('/assign', authorize(['admin']), async (req: Request, res: Response, next: NextFunction)=>{

    var updatedTicket = await ticketServices.assign(req.body);
    res.json(updatedTicket);
});

router.patch('/accept', authorize(['user']), async (req: Request, res: Response, next: NextFunction)=>{

    req.body.assignedUserId = req.body.userId;
    var updatedTicket = await ticketServices.accept(req.body);
    res.json(updatedTicket);
});

router.patch('/resolve', authorize(['user']), async (req: Request, res: Response, next: NextFunction)=>{

    req.body.assignedUserId = req.body.userId;
    var updatedTicket = await ticketServices.resolve(req.body);
    res.json(updatedTicket);
});

export default router;