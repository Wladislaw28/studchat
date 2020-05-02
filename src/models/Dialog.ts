import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IDialog extends Document {
    author: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: boolean;
    };
    partners: [{
        type: Schema.Types.ObjectId;
        ref: string;
        require: boolean;
    }];
    messages: [{
        type: Schema.Types.ObjectId;
        ref: string;
    }];
}

const DialogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', require: Boolean },
    partners: [{ type: Schema.Types.ObjectId, ref: 'User', require: Boolean }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
}, {
    timestamps: true
});

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema)

export default DialogModel;