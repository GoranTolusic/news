import { BadRequest } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import CreateUser from '../validationTypes/CreateUser';
import { validatorDto } from '../helpers/validatorDto';
import { middlewareHandler } from '../helpers/middlewareHandler';

export const authMiddleware = Router();

//prefix = auth/

//Specificic endpoints middlewares
authMiddleware.post('/register', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    await validatorDto(CreateUser, req.body, CreateUser.pickedProps())
}));

authMiddleware.post('/login', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) throw new BadRequest('Email and password are required')
}));

authMiddleware.get('/verifytoken', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.verifyToken || !req.query.userId) throw new BadRequest('userId and verifyToken are required')
}));
