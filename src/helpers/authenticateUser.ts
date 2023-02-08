import { Unauthorized } from '@tsed/exceptions';
import { Request, Response, NextFunction } from 'express';
import JWTService from '../services/JWTService';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.accesstoken) throw new Unauthorized('You are not logged in', 401)
        let token = String(req.headers.accesstoken)
        let jwtService = new JWTService()
        let loggedUser = jwtService.verifyToken(token)
        Object.assign(req, { loggedUser: loggedUser })
}