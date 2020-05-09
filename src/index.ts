import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { UserController, DialogController, MessageController } from './controllers';

import { updateLastSeen, checkAuth } from './middlewares';

import { loginValidation } from './utils/validations';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect("mongodb://localhost:27017/studchat", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get('/user/:id', User.show);
app.delete('/user/:id', User.delete);
app.post("/user/registration", User.create);
app.post("/user/login", loginValidation, User.login)

app.get('/dialogs', Dialog.index);
app.delete('/dialogs/:id', Dialog.delete);
app.post('/dialogs', Dialog.create);

app.get('/messages', Message.index);
app.delete('/messages/:id', Message.delete);
app.post('/messages', Message.create);

app.listen(process.env.PORT, () => {
    console.log(`Server: http://localhost:${process.env.PORT}`);
});