import { Request, Response } from 'express';
import { Service } from "typedi";
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import { omit } from 'lodash';

@Service()
class PostController {
    constructor(private readonly postService: PostService,
        private readonly userService: UserService) { }

    public async create(req: Request, res: Response) {
        req.body._validated._userId = req.loggedUser._id
        return await this.postService.create(req.body._validated)
    }

    public async update(req: Request, res: Response) {
        return await this.postService.update(req.body._validated, req.params.id)
    }

    public async get(req: Request, res: Response) {
        let result = await this.postService.get(req.params.id)
        return req.loggedUser.role == 'guest' ? omit(result, ['viewCount']) : result
    }

    public async delete(req: Request, res: Response) {
        return await this.postService.delete(req.params.id)
    }

    public async filter(req: Request, res: Response) {
        let results
        results = await this.postService.filter(req.body)
        return (req.loggedUser.role == 'guest') ? results.map(item => omit(item, ['viewCount'])) : results
    }

    public async getExternalNews(req: Request, res: Response) {
        return await this.postService.getExternalNews(req.query)
    }
}

export default PostController