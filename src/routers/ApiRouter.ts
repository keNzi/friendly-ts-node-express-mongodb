import { Request, Response, Router, NextFunction } from 'express';
import Api from '../controllers/ApiController';
import { ApiItem } from '../models/ApiItem';

class ApiRouter {
    private _router = Router();
    private _controller = Api;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this.router.get('/item', [], async (req: Request, res: Response, next: NextFunction) => {
            const apiitem = await ApiItem.find({});
            return res.status(200).send(apiitem);
            // res.status(200).send("<h1>" + this._controller.defaultMethod() + "</h1>GET method");
        });

        this.router.post('/newItem', async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            const { title, description } = req.body;

            const apiitem = ApiItem.build({ title, description });
            await apiitem.save();
            return res.status(201).send(apiitem);
        });
    }
}

export = new ApiRouter().router;
