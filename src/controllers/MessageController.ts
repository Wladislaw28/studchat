import express, { Request, Response } from 'express';
import { MessageModel } from '../models';
import { IMessage } from '../models/Message';
import socket from 'socket.io';

class MessageController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index(req: Request, res: Response) {
        const dialogId: any = req.query.dialog;
        MessageModel.find({ dialog: dialogId })
            .populate(["dialog"])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not fount'
                    })
                }
                return res.json(messages);
            });
    }

    create(req: any, res: Response) {
        const postData = {
            text: req.body.text,
            user: req.user._id,
            dialog: req.body.dialog_id
        }
        const message: IMessage = new MessageModel(postData);
        message.save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch((reason) => {
                res.json(reason);
            });
    }

    delete(req: Request, res: express.Response) {
        const id: string = req.params.id;
        MessageModel.findOneAndRemove({ _id: id })
            .then(message => {
                if (message) {
                    res.json({
                        message: `Message removed`
                    });
                }
            }).catch(() => {
                res.json({
                    message: 'Not found message'
                })
            });
    }
}

export default MessageController;