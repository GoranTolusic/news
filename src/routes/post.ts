import { Request, Response, Router } from 'express';
import PostController from '../controllers/PostController';
import Container from 'typedi';
import { routeHandler } from '../helpers/routeHandler';

export const postRoutes = Router();
const postController = Container.get(PostController)

//prefix = post/
postRoutes.get('/getExternalNews', routeHandler((req: Request, res: Response) => postController.getExternalNews(req, res)));
postRoutes.post('/create', routeHandler((req: Request, res: Response) => postController.create(req, res)));
postRoutes.patch('/:id', routeHandler((req: Request, res: Response) => postController.update(req, res)));
postRoutes.get('/:id', routeHandler((req: Request, res: Response) => postController.get(req, res)));
postRoutes.delete('/:id', routeHandler((req: Request, res: Response) => postController.delete(req, res)));
postRoutes.post('/filter', routeHandler((req: Request, res: Response) => postController.filter(req, res)));


