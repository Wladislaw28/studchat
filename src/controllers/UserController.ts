import express, { Response, Request } from 'express';
import { UserModel } from '../models';
import { IUser } from '../models/User';

class UserController {
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

    create(req: Request, res: Response) {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password
        }
        const user: IUser = new UserModel(postData);
        user.save().then((obj: any) => {
            res.json(obj);
        }).catch((reason) => {
            res.json(reason);
        });
    }

    delete(req: Request, res: Response) {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({ _id: id }).then(user => {
            if (user) {
                res.json({
                    message: `User ${user.fullName} removed`
                });
            }
        }).catch(() => {
            res.json({
                message: 'Not found user'
            })
        });
    }
}

export default UserController;