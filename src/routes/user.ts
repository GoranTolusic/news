import { Request, Router, Response } from 'express';
import  UserController from '../controllers/UserController';
import Container from 'typedi';
import { routeHandler } from '../helpers/routeHandler';

export const userRoutes = Router();
const userController = Container.get(UserController)

//prefix = user/
userRoutes.get('/:id', routeHandler((req: Request, res: Response) => userController.getOne(req, res)));
userRoutes.post('/filter', routeHandler((req: Request, res: Response) => userController.filter(req, res)));
userRoutes.post('/', routeHandler((req: Request, res: Response) => userController.create(req, res)));
userRoutes.patch('/:id', routeHandler((req: Request, res: Response) => userController.update(req, res)));
userRoutes.delete('/:id', routeHandler((req: Request, res: Response) => userController.delete(req, res)));

