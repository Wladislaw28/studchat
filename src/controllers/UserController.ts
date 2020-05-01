import express from 'express';
import { UserModel } from '../schemas';
import { IUser } from '../schemas/User';

class UserController {
    show(req: any, res: express.Response) {
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

    create(req: any, res: express.Response) {
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

    remove(req: any, res: express.Response) {
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