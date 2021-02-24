import { Request, Response, Router, NextFunction } from 'express';
import Api from '../controllers/ApiController';

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
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).send("<h1>" + this._controller.defaultMethod() + "</h1>GET method");
        });

        this.router.post('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).send(this._controller.defaultMethod() + "POST method");
        });
    }
}

export = new ApiRouter().router;
