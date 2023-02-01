import { Request, Response } from 'express';
import { Service } from "typedi";
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

@Service()
class AuthController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService) { }

    public async register(req: Request, res: Response) {
        return await this.userService.create(req.body._validated)
    }

    public async login(req: Request, res: Response) {
        return await this.authService.login(req.body)
    }

    public async verifyToken(req: Request, res: Response) {
       return await this.authService.verifyToken(req.query)
    }
}

export default AuthController