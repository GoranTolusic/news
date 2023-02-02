import { Request, Response, Router } from 'express';
import PostController from '../controllers/PostController';
import Container from 'typedi';
import { routeHandler } from '../helpers/routeHandler';

export const postRoutes = Router();
const postController = Container.get(PostController)

//prefix = post/
postRoutes.post('/create', routeHandler((req: Request, res: Response) => postController.create(req, res)));
