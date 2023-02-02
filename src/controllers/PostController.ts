import { Request, Response } from 'express';
import { Service } from "typedi";
import PostService from '../services/PostService';

@Service()
class PostController {
    constructor(private readonly postService: PostService) { }

    public async create(req: Request, res: Response) {
        return await this.postService.create(req.body)
    }
}

export default PostController