import { BadRequest } from '@tsed/exceptions';
import { Router, Request, Response, NextFunction } from 'express';
import CreateUser from '../validationTypes/CreateUser';
import { validatorDto } from '../helpers/validatorDto';

export const authMiddleware = Router();

//prefix = auth/

//Specificic endpoints middlewares
authMiddleware.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validatorDto(CreateUser, req.body, CreateUser.pickedProps())
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

authMiddleware.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.email || !req.body.password) throw new BadRequest('Email and password are required')
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});

authMiddleware.get('/verifytoken', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.query.verifyToken || !req.query.userId) throw new BadRequest('userId and verifyToken are required')
        next()
    } catch (error) {
        res.status(400).json(error)
    }
});
