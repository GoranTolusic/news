import { Router } from 'express';
import  UserController from '../controllers/UserController';
import Container from 'typedi';

export const userRoutes = Router();

const userController = Container.get(UserController)

//prefix = user/
userRoutes.get('/:id', (req, res) => userController.getOne(req, res));
userRoutes.post('/filter', (req, res) => userController.filter(req, res));
userRoutes.post('/', (req, res) => userController.create(req, res));
userRoutes.patch('/:id', (req, res) => userController.update(req, res));
userRoutes.delete('/:id', (req, res) => userController.delete(req, res));

