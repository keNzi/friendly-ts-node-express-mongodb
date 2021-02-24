import { Router } from 'express';
import OnlineItemRouter from './OnlineItemRouter';
import OfflineItemRouter from './OfflineItemRouter';

class MasterRouter {
  private _router = Router();
  private _subrouterA = OnlineItemRouter;
  private _subrouterB = OfflineItemRouter;

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
    this._router.use('/online', this._subrouterA);
    this._router.use('/offline', this._subrouterB);
  }
}

export = new MasterRouter().router;
