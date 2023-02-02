import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';

import "reflect-metadata"

//import routes
import { authRoutes } from './src/routes/auth';
import { postRoutes } from './src/routes/post';

//import middlewares
import { authMiddleware } from './src/middlewares/auth';
import { postMiddleware } from './src/middlewares/post';

//bootstrap the app
const app: Express = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

//middleware registry
app.use('/auth', authMiddleware);
app.use('/post', postMiddleware);

//Route registry
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

//handling unknown routes
app.all('*', function (req, res) {
    res.status(404).send({
        message: 'Unknown route'
    });
})

app.listen(process.env.PORT, () => {
    console.log(`We are live! Server is running at http://localhost:${process.env.PORT}`);
});