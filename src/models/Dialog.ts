import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IDialog extends Document {
    author: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    partners: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    messages: [{
        type: Schema.Types.ObjectId;
        ref: string;
    }];
}

const DialogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    partners: { type: Schema.Types.ObjectId, ref: 'User' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
}, {
    timestamps: true
});

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema)

export default DialogModel;