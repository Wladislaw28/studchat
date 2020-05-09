import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { generatePasswordHash } from '../utils';

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

// UserSchema.pre('save', function(next) {
//     const user: IUser = this;

//     if (!user.isModified('password')) {
//         return next();
//     }

//     generatePasswordHash(user.password)
//         .then(hash => {
//             user.password = String(hash);
//             next();
//         })
//         .catch(err => {
//             next(err);
//         })
// })

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel;