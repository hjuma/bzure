import {authenticationService } from '../services/authentication';
import { Router, Request, Response, NextFunction } from 'express';
import { UserInstance } from "../models/interfaces/user";

export class LoginRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async verifyToken(request: Request, response: Response, next: NextFunction) {
        const token = request.headers['authorization'];
        const result: any = await authenticationService.verifyToken(token);

        console.log(result);

        if(result.code == 200) {
            request['user'] = result.data;
            next();
        } else {
            response.statusCode = result.code;
            response.json(result.err);
        }
    }

    public login(req: Request, res: Response, next: NextFunction) {
        authenticationService.login(req.body.username,req.body.password).then((response) => {
            return res.status(response['code']).send(response);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    init() {
        this.router.post('/', this.login);
    }

}

export const loginRoutes = new LoginRouter();
loginRoutes.init();

export default loginRoutes.router;