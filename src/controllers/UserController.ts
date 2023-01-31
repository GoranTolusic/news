import { Request, Response } from 'express';
import { Service } from "typedi";
import UserService from '../services/UserService';

@Service()
class UserController {
    constructor(private readonly userService: UserService) { }

    public async filter(req: Request, res: Response) {
        try {
            let results = await this.userService.filter(req.body)
            res.json(results)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            let result = await this.userService.getOne(Number(req.params.id))
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            let result = await this.userService.create(req.body._validated)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            await this.userService.delete(Number(req.params.id))
            res.json({ message: "deleted" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async update(req: Request, res: Response) {
        try {
            let result = await this.userService.update(Number(req.params.id), req.body._validated)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default UserController