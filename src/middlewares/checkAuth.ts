import express, { Request, Response, NextFunction } from 'express';
import { verifyJWTToken } from '../utils';
// import { IUser } from '../models/User';

// interface IRequestCustom extends Request {
//     user?: IUser;
//     headers: {
//         token?: string
//     }
// }

export default (req: any, res: Response, next: NextFunction) => {
    if (req.path === '/user/signin' ||
        req.path === '/user/signup' ||
        req.path === '/user/verify') {
        return next();
    }
    const token = req.headers.token;
    verifyJWTToken(token).then((user: any) => {
        req.user = user.data._doc;
        next();
    }).catch(() => {
        res.status(403).json({ message: "Invalid auth token provided" })
    })
}