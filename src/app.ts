import * as db from './db';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import MasterRouter from './routers/MasterRouter';
import ErrorHandler from './models/ErrorHandler';

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// Connect to MongoDB
mongoose.connect(`mongodb://${db.MONGODB_USER}:${db.MONGODB_PASS}@${db.MONGODB_URL}:${db.MONGODB_PORT}/${db.MONGODB_DBNAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log(`Connected to database ${db.MONGODB_DBNAME}`)
});

// initialize server app
const server = new Server();

// configure the app to use json and urlencoded from body-parser
server.app.use(urlencoded({
  extended: true
}));
server.app.use(json());

// make server listen on some port
server.app.listen(db.PORT, () => console.log(`> Listening on port ${db.PORT}`));

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
