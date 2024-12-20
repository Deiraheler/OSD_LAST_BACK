import { Request, Response } from 'express';
import { verifyToken } from "../utils/jwt";

export const checkToken = (req: Request, res: Response) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        verifyToken(token);
        res.json(true);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};