import { Router, Request, Response, NextFunction } from 'express';
import { CreatePost } from '../validationTypes/CreatePost';
import { validatorDto } from '../helpers/validatorDto';
import { middlewareHandler } from '../helpers/middlewareHandler';
import { authenticateUser } from '../helpers/authenticateUser';
import { Forbidden } from '@tsed/exceptions';
import { UpdatePost } from '../validationTypes/UpdatePost';
import { FilterPosts } from '../validationTypes/FilterPosts';

export const postMiddleware = Router();

//prefix = post/

//global middleware for all class/ routes
postMiddleware.use(authenticateUser)

//Specificic endpoints middlewares
postMiddleware.post('/create', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    await validatorDto(CreatePost, req.body, CreatePost.pickedProps())
    if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
}));

postMiddleware.post('/filter', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    await validatorDto(FilterPosts, req.body, FilterPosts.pickedProps())
}));

postMiddleware.patch('/:id', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    await validatorDto(UpdatePost, req.body, UpdatePost.pickedProps())
    if (!['admin', 'editor'].includes(req.loggedUser.role)) throw new Forbidden('You have no permission for this action')
}));

postMiddleware.delete('/:id', middlewareHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.loggedUser.role !== 'admin') throw new Forbidden('You have no permission for this action')
}));
