import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import MasterRouter from './routers/MasterRouter';
import ErrorHandler from './models/ErrorHandler';

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

const PORT = process.env.APP_PORT || 5000;

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// initialize server app
const server = new Server();

// make server listen on some port
server.app.listen(PORT, () => console.log(`> Listening on port ${PORT}`));

// make server app handle any route starting with '/'
server.app.use('/', server.router);

// make server app handle any error
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
});
