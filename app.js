import express from 'express';
import cors from 'cors';
import { mongo } from 'mongoose';

mongo.connect('mongodb+srv://web-final:0YPyPauA8yYbcuyW@cluster0.j6ysphf.mongodb.net/?retryWrites=true&w=majority');

const app = express()

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.json());


app.get('/hello', (req, res) => {res.send('Hello World!')})
app.listen(4000)