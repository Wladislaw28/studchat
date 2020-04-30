import mongoose from 'mongoose';
import express from 'express';

import User from './schemas/User'

const app = express();

mongoose.connect("mongodb://localhost:27017/studchat", { useNewUrlParser: true });

app.get("/", (_: any, res: any) => {
    res.send("Hello World");
    const user = new User({ email: 'home@domain.com', fullName: 'Petr'});
    user.save().then(() => console.log('User Created'));
});

app.listen(3000, () => {
    console.log("port 3000");
});