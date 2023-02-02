import { Request, Response } from 'express';
import { Service } from "typedi";
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import { ObjectId } from "bson"
import { omit } from 'lodash';

@Service()
class PostController {
    constructor(private readonly postService: PostService,
        private readonly userService: UserService) { }

    public async create(req: Request, res: Response) {
        req.body._validated.idUser = req.loggedUser._id
        return await this.postService.create(req.body._validated)
    }

    public async get(req: Request, res: Response) {
        let result = await this.postService.get(req.params.id)
        return req.loggedUser.role == 'guest' ? omit(result, ['viewCount']) : result
    }
}

export default PostController