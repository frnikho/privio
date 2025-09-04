import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import authRoute from "@api/route/auth.route";
import userRoute from "@api/route/user.route";

const app = express()
    .use(helmet())
    .use(bodyParser.json())
    .use(cookieParser())
    .use('/auth', authRoute)
    .use('/user', userRoute)
    .listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });

app.on('error', (err) => {
    console.error('Server error:', err);
});