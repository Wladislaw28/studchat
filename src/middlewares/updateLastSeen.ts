import express, { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';

export default (req: Request, res: Response, next: NextFunction) => {
    // UserModel.updateOne({ _id: '5eac9744f17e262e881a1eac' }, { $set: { last_seen: new Date() } });
    UserModel.findByIdAndUpdate({ _id: '5eac9744f17e262e881a1eac' }, { last_seen: new Date() }, (err, res) => {
        if (err) {
            console.log(err.message);
        }
    });

    next();
}