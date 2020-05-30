import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import differenceInMinutes from 'date-fns/differenceInMinutes';

export interface IUser extends Document {
    email: string;
    fullName: string;
    password: string;
    confirmed: boolean;
    avatar?: string;
    confirm_hash?: string;
    last_seen?: Date;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'Invalid email'],
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

UserSchema.virtual("isOnline").get(function (this: any) {
    return differenceInMinutes(new Date(), this.last_seen) < 5;
});

UserSchema.set("toJSON", {
    virtuals: true
});

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel;