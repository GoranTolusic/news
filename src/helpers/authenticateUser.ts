import { Unauthorized } from '@tsed/exceptions';
import { Request, Response, NextFunction } from 'express';
import JWTService from '../services/JWTService';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.accesstoken) throw new Unauthorized('You are not logged in', 401)
        let jwtService = new JWTService()
        let loggedUser = jwtService.verifyToken(req.headers.accesstoken)
        Object.assign(req, { loggedUser: loggedUser })
        next()
    } catch (error) {
        res.status(401).json(error)
    }
}