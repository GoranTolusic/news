import { Request, Response, NextFunction } from "express";

export const middlewareHandler = (handler: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await handler(req, res, next)
        next()
    } catch (error) {
        res.status(500).json(error)
    }
};