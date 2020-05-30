import express, { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';

export default (req: any, res: Response, next: NextFunction) => {
    UserModel.findByIdAndUpdate({ _id: req.user._id }, { last_seen: new Date() }, (err, res) => {
        if (err) {
            console.log(err.message);
        }
    });

    next();
}