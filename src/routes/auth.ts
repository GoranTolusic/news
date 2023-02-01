import { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController';
import Container from 'typedi';
import { routeHandler } from '../helpers/routeHandler';

export const authRoutes = Router();
const authController = Container.get(AuthController)

//prefix = auth/
authRoutes.post('/register', routeHandler((req: Request, res: Response) => authController.register(req, res)));
authRoutes.post('/login', routeHandler((req: Request, res: Response) => authController.login(req, res)));
authRoutes.get('/verifyEmail', routeHandler((req: Request, res: Response) => authController.verifyToken(req, res)));

