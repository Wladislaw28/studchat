import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import { UserController, DialogController, MessageController } from './controllers';

import { updateLastSeen } from './middlewares';

const app = express();

app.use(bodyParser.json());
app.use(updateLastSeen);

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

app.get('/dialogs', Dialog.index);
app.delete('/dialogs/:id', Dialog.delete);
app.post('/dialogs', Dialog.create);

app.get('/messages', Message.index);
app.delete('/messages/:id', Message.delete);
app.post('/messages', Message.create);

app.listen(3000, () => {
    console.log("port 3000");
});