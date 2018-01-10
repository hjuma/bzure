import { authenticationService } from '../services/authentication';
import { Router, Request, Response, NextFunction } from 'express';

export class RSARouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getPublicKeys(req: Request, res: Response, next: NextFunction) {
        authenticationService.getPublicKeys().then((response) => {
            return res.send(response);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    init() {
        this.router.get('/', this.getPublicKeys);
    }

}

export const rsaRoutes = new RSARouter();
rsaRoutes.init();

export default rsaRoutes.router;