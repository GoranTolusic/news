import { Request, Response } from "express";

export const routeHandler = (handler: Function) => async (req: Request, res: Response) => {
    try {
        let result = await handler(req, res)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
};