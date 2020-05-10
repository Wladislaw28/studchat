import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/studchat", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});