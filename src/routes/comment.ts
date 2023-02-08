import { Request, Response, Router } from 'express';
import Container from 'typedi';
import { routeHandler } from '../helpers/routeHandler';
import CommentController from '../controllers/CommentController';

export const commentRoutes = Router();
const commentController = Container.get(CommentController)

//prefix = comment/
commentRoutes.post('/create', routeHandler((req: Request, res: Response) => commentController.create(req, res)));
commentRoutes.delete('/:id', routeHandler((req: Request, res: Response) => commentController.delete(req, res)));
commentRoutes.post('/filter', routeHandler((req: Request, res: Response) => commentController.filter(req, res)));

