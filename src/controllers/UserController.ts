import express, { Response, Request } from 'express';
import socket from 'socket.io';
import bcrypt from 'bcrypt';
import { validationResult, ValidationError, Result } from 'express-validator';

import { UserModel } from '../models';
import { IUser } from '../models/User';
import { createJWTToken } from '../utils';

class UserController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    create = async (req: any, res: Response) => {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
            confirm_hash: ''
        }
        postData.password = await bcrypt.hash(postData.password, 10);

        postData.confirm_hash = await bcrypt.hash(+new Date() + '', 10);

        const errors: any = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const user: IUser = new UserModel(postData);
        user.save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch(reason => {
                return res.status(500).json({
                    status: "error",
                    message: reason
                })
            });
    };

    login = (req: any, res: Response) => {
        const postData = {
            email: req.body.email,
            password: req.body.password
        };
        const errors: any = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        UserModel.findOne({ email: postData.email }, (err, user: any) => {
            if (err || !user) {
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
                res.status(403).json({
                    status: 'fail',
                    message: 'incorrect email or password'
                })
            }
        })
    };

    verify = (req: any, res: Response) => {
        const hash = req.query.hash;

        if (!hash) {
            return res.status(422).json({
                errors: 'Invalid hash'
            })
        }

        UserModel.findOne({ confirm_hash: hash }, (err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    status: "error",
                    message: 'Not found hash'
                })
            }

            user.confirmed = true;
            user.save((err) => {
                if (err) {
                    return res.status(404).json({
                        status: "error",
                        message: err
                    })
                }
                res.json({
                    status: 'success',
                    message: 'Аккаунт успешно подтверждён'
                });
            })
        });
    }

    show = (req: any, res: Response) => {
        const id: string = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found user'
                })
            }
            res.json(user);
        });
    };

    getMe = (req: any, res: Response) => {
        const id: string = req.user._id;
        UserModel.findById(id, (err, user: any) => {
            if (err || !user) {
                return res.status(404).json({
                    message: 'Not found user'
                })
            }
            res.json(user);
        });
    };

    findUsers = (req: any, res: express.Response) => {
        const query: string = req.query.query;
        UserModel.find()
            .or([
                { fullname: new RegExp(query, "i") },
                { email: new RegExp(query, "i") }
            ])
            .then((users: any) => res.json(users))
            .catch((err: any) => {
                return res.status(404).json({
                    status: "error",
                    message: err
                });
            });
    };

    delete = (req: any, res: express.Response) => {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({ _id: id })
            .then((user: any) => {
                if (user) {
                    res.json({
                        message: `User ${user.fullName} deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `User not found`
                });
            });
    };
}

export default UserController;