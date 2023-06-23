import express from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import session from "express-session";
import AuthController from './controllers/auth-controller.js';
import ReviewController from './reviews/reviews-controller.js';
import UsersController from './controllers/users-controller.js';

mongoose.connect('mongodb+srv://web-final:0YPyPauA8yYbcuyW@cluster0.j6ysphf.mongodb.net/?retryWrites=true&w=majority');

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

AuthController(app);
ReviewController(app);
UsersController(app);   
// app.get('/hello', (req, res) => {res.send('Hello World!')})
app.listen(4000)