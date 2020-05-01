import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import { UserController } from './controllers';

const app = express();

app.use(bodyParser.json());

const User = new UserController();

mongoose.connect("mongodb://localhost:27017/studchat", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get('/user/:id', User.show);
app.delete('/user/:id', User.remove);
app.post("/user/registration", User.create);

app.listen(3000, () => {
    console.log("port 3000");
});