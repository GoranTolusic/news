import { BadRequest, Forbidden } from '@tsed/exceptions';
import { Router, Response, NextFunction } from 'express';
import { validatorDto } from '../helpers/validatorDto';
import CreateUser from '../validationTypes/CreateUser';
import UpdateUser from '../validationTypes/UpdateUser';
import { authenticateUser } from '../helpers/authenticateUser';

export const userMiddleware = Router();

//prefix = user/

//global middleware for all user/ routes
userMiddleware.use(authenticateUser)

//Specific route middlewares
userMiddleware.post('/', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(CreateUser, req.body, CreateUser.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

userMiddleware.get('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

userMiddleware.patch('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        await validatorDto(UpdateUser, req.body, UpdateUser.pickedProps())
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

userMiddleware.delete('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        if (isNaN(Number(req.params.id))) throw new BadRequest('Invalid URI id')
        if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
        next()
    } catch (error) {
        res.status(500).json(error)
    }
});

