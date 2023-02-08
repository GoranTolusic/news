import { Router, Request, Response, NextFunction } from 'express';
import { validatorDto } from '../helpers/validatorDto';
import { middlewareHandler } from '../helpers/middlewareHandler';
import { authenticateUser } from '../helpers/authenticateUser';
import { Forbidden } from '@tsed/exceptions';
import { CreateComment } from '../validationTypes/CreateComment';
import { FilterComments } from '../validationTypes/FilterComments';

export const commentMiddleware = Router();

//prefix = comment/

//global middleware for all comment/ routes
commentMiddleware.use(authenticateUser)

//Specificic endpoints middlewares
commentMiddleware.post('/create', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    await validatorDto(CreateComment, req.body, CreateComment.pickedProps())
}));

commentMiddleware.post('/filter', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    await validatorDto(FilterComments, req.body, FilterComments.pickedProps())
}));

commentMiddleware.delete('/:id', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.loggedUser.role == 'admin') throw new Forbidden('You have no permission for this action')
}));
