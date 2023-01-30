import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Container from 'typedi';

export const authRoutes = Router();

const authController = Container.get(AuthController)

//prefix = auth/
authRoutes.post('/register', (req, res) => authController.register(req, res));
authRoutes.post('/login', (req, res) => authController.login(req, res));
authRoutes.get('/verifyEmail', (req, res) => authController.verifyToken(req, res));

