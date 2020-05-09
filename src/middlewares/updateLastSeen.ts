import express, { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';

export default (req: Request, res: Response, next: NextFunction) => {
    UserModel.findByIdAndUpdate({ _id: '5eb6bb324a54f5027c32a79b' }, { last_seen: new Date() }, (err, res) => {
        if (err) {
            console.log(err.message);
        }
    });

    next();
}