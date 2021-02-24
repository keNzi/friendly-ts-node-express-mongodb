import { Router } from 'express';
import OnlineItemRouter from './OnlineItemRouter';
import OfflineItemRouter from './OfflineItemRouter';
import ApiRouter from './ApiRouter';

class MasterRouter {
  private _router = Router();
  private _onlinerouter = OnlineItemRouter;
  private _offlinerouter = OfflineItemRouter;
  private _apirouter = ApiRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/online', this._onlinerouter);
    this._router.use('/offline', this._offlinerouter);
    this._router.use('/api', this._apirouter);
  }
}

export = new MasterRouter().router;
