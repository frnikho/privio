import {Router, Response} from "express";
import {validate} from "@api/middleware/validation.middleware";
import {authLoginReq, AuthLoginRequest, AuthRegisterReq, authRegisterReq} from "@privio/types/auth";
import {Req} from "@api/utils/request";
import {handleResponse, response, send} from "@api/utils/response";
import registerUser from "@application/auth/register-user";
import loginUser from "@application/auth/login-user";
import {withAuth} from "@api/middleware/auth.middleware";
import logoutUser from "@application/auth/logout-user";
import {userSchema} from "@privio/types/user";
import getMe from "@application/auth/get-me";

const register = (req: Req<AuthRegisterReq>, res: Response) => {
    return handleResponse(res, registerUser({body: req.body}), ({user, accessToken}) => {
        res.cookie('access_token', accessToken, {httpOnly: true, secure: true, sameSite: 'strict', path: '/'});
        return send(res.status(200), user, userSchema)
    });
}

const login = (req: Req<AuthLoginRequest>, res: Response) => {
    return handleResponse(res, loginUser({body: req.body}), ({user, accessToken}) => {
        res.cookie('access_token', accessToken, {httpOnly: true, secure: true, sameSite: 'strict', path: '/'});
        return send(res.status(200), user, userSchema)
    })
}

const logout = (req: Req, res: Response) => {
    return handleResponse(res, logoutUser({auth: req.auth}), () => {
        res.cookie('access_token', null);
        return res.status(200).send();
    })
}

const me = (req: Req, res: Response) => {
    return response(res, getMe({auth: req.auth}), userSchema);
}

export default Router()
    .post('/register', validate({body: authRegisterReq}), register)
    .post('/login', validate({body: authLoginReq}), login)
    .post('/logout', withAuth(), logout)
    .get('/me', withAuth(), me)