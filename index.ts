import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';

import "reflect-metadata"

//import routes
import { userRoutes } from './src/routes/user'
import { authRoutes } from './src/routes/auth';

//import middlewares
import { userMiddleware } from './src/middlewares/user'
import { authMiddleware } from './src/middlewares/auth';



//bootstrap the app
const app: Express = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

//middleware registry
app.use('/auth', authMiddleware);
app.use('/user', userMiddleware);

//Route registry
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

//handling unknown routes
app.all('*', function (req, res) {
  res.status(404).send({
    message: 'Unknown route'
  });
})

app.listen(process.env.PORT, () => {
  console.log(`We are live! Server is running at http://localhost:${process.env.PORT}`);
});