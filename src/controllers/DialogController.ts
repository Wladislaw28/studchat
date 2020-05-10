import express, { Request, Response } from 'express';
import { DialogModel, MessageModel } from '../models';
import { IDialog } from '../models/Dialog';
import socket from 'socket.io';

class DialogController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index(req: any, res: Response) {
        DialogModel.find({ author: req.user._id })
            .populate(["author", "partners"])
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not fount'
                    })
                }
                return res.json(dialogs);
            });
    }

    create(req: Request, res: Response) {
        const postData = {
            author: req.body.author,
            partners: req.body.partners
        }
        const dialog: IDialog = new DialogModel(postData);
        dialog.save()
            .then((dialogObj: any) => {
                const message = new MessageModel({
                    text: req.body.text,
                    dialog: dialogObj._id,
                    user: req.body.author,
                });
                message.save()
                    .then(() => {
                        res.json(dialogObj);
                    })
                    .catch((reason) => {
                        res.json(reason);
                    })

            })
            .catch((reason) => {
                res.json(reason);
            });
    }

    delete(req: Request, res: Response) {
        const id: any = req.params.id;
        DialogModel.findOneAndRemove({ _id: id })
            .then(dialog => {
                if (dialog) {
                    res.json({
                        message: `Dialog removed`
                    });
                }
            }).catch(() => {
                res.json({
                    message: 'Not found dialog'
                })
            });
    }
}

export default DialogController;