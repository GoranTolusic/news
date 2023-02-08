import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { registry } from './registry';

//bootstrap the app

export const bootstrap = async () => {
    const app: Express = express();
    app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

    //dynamicaly register and load middlewares and routes
    await registry(app)

    app.listen(process.env.PORT, () => {
        console.log(`We are live! Server is running at http://localhost:${process.env.PORT}`);
    });
};



