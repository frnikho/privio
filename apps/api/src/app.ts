import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from "@api/route/auth.route";
import userRoute from "@api/route/user.route";
import gameRoute from "@api/route/game.route";
import {seed} from "./seed";

const app = express()
    .use(helmet())
    .use(cors({
        origin: process.env.ALLOW_ORIGIN || 'http://localhost:5173',
        credentials: true
    }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use('/auth', authRoute)
    .use('/user', userRoute)
    .use('/game', gameRoute)
    .listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });