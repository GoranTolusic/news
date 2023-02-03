import { Request, Response } from 'express';
import { Service } from "typedi";
import CommentService from '../services/CommentService';

@Service()
class CommentController {
    constructor(private readonly commentService: CommentService) { }

    public async create(req: Request, res: Response) {
        req.body._validated._userId = req.loggedUser._id
        return await this.commentService.create(req.body._validated)
    }

    public async delete(req: Request, res: Response) {
        return await this.commentService.delete(req.params.id)
    }

    public async filter(req: Request, res: Response) {
        return await this.commentService.filter(req.body)
    }
}

export default CommentController