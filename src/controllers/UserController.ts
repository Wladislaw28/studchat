import express, { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { validationResult, ValidationError, Result } from 'express-validator';

import { UserModel } from '../models';
import { IUser } from '../models/User';
import { createJWTToken } from '../utils';

class UserController {

    login(req: Request, res: Response) {
        const postData = {
            email: req.body.email,
            password: req.body.password
        };
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        UserModel.findOne({ email: postData.email }, (err, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found user'
                })
            }
            if (bcrypt.compareSync(postData.password, user.password)) {
                const token: string = createJWTToken(user);
                res.json({
                    status: 'success',
                    token: token
                })
            } else {
                res.json({
                    status: 'fail',
                    message: 'incorrect email or password'
                })
            }
        })
    }

    show(req: Request, res: Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found user'
                })
            }
            res.json(user);
        });
    }

    async create(req: Request, res: Response) {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password
        }
        postData.password = await bcrypt.hash(postData.password, 10);
        const user: IUser = new UserModel(postData);
        user.save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch((reason) => {
                res.json(reason);
            });
    }

    delete(req: Request, res: Response) {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({ _id: id })
            .then(user => {
                if (user) {
                    res.json({
                        message: `User ${user.fullName} removed`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: 'Not found user'
                })
            });
    }
}

export default UserController;