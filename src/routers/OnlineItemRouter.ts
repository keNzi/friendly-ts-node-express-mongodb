import { NextFunction, Request, Response, Router } from 'express';
import OnlineItemController from '../controllers/OnlineItemController';

class OnlineItemRouter {
    private _router = Router();
    private _controller = OnlineItemController;

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
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).send(this._controller.defaultMethod());
        });
    }
}

export = new OnlineItemRouter().router;
