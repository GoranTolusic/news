import { Request, Response } from 'express';
import { Service } from "typedi";
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

@Service()
class AuthController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService) { }

    public async register(req: Request, res: Response) {
        try {
            let result = await this.userService.create(req.body._validated)
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async login(req: Request, res: Response) {
        try {
            let result = await this.authService.login(req.body)
            res.json({ accessToken: result })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async verifyToken(req: Request, res: Response) {
        try {
            await this.authService.verifyToken(req.query)
            res.json({ message: 'verified successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default AuthController