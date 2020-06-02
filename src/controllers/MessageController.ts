import express, { Request, Response } from 'express';
import { MessageModel, DialogModel } from '../models';
import { IMessage } from '../models/Message';
import socket from 'socket.io';

class MessageController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: any, res: Response) => {
        const dialogId = req.query.dialog;
        const userId = req.user._id;

        MessageModel.find({ dialog: dialogId })
            .populate(["dialog", "user"])
            .exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Messages not fount'
                    })
                }
                return res.json(messages);
            });
    }

    create = (req: any, res: Response) => {
        const postData = {
            text: req.body.text,
            user: req.user._id,
            dialog: req.body.dialog_id
        }
        const message: IMessage = new MessageModel(postData);
        message.save()
            .then((obj: any) => {
                obj.populate(["dialog", "user"], (err: any, message: any) => {

                    if (err) {
                        return res.status(500).json({
                            status: "error",
                            message: err
                        })
                    }

                    DialogModel.findOneAndUpdate({ _id: postData.dialog }, { lastMessage: message._id }, { upsert: true },
                        function (err) {
                            if (err) {
                                return res.status(500).json({
                                    status: "error",
                                    message: err
                                })
                            }
                        });

                    res.json(message);
                    this.io.emit("SERVER:NEW_MESSAGE", message);
                })
            })
            .catch((reason) => {
                res.json(reason);
            });
    }

    delete = (req: Request, res: Response) => {
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