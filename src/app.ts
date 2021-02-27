import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import MasterRouter from './routers/MasterRouter';
import ErrorHandler from './models/ErrorHandler';

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

const PORT = process.env.APP_PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || '27017';
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// Connect to MongoDB
mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DBNAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log(`Connected to database ${MONGODB_DBNAME}`)
});

// initialize server app
const server = new Server();

// configure the app to use json and urlencoded from body-parser
server.app.use(urlencoded({
  extended: true
}));
server.app.use(json());

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
