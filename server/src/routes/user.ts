import { userService } from '../services/user';
import { UserAttributes, UserInstance } from '../models/interfaces/user';
import { Router, Request, Response, NextFunction } from 'express';

export class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        userService.retrieveUsers().then((users: Array<UserInstance>) => {
            return res.send(users);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        userService.retrieveUser(req.params.id).then((user: UserInstance) => {
            return res.send(user);
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public addUser(req: Request, res: Response, next: NextFunction) {
        userService.createUser(req.body).then((user: UserInstance) => {
            if (user) {
                return res.send({
                    status: 200,
                    message: 'User added successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    public updateUser(req: Request, res: Response, next: NextFunction) {
        userService.updateUser(req.params.id, req.body).then((user: UserInstance) => {
            if (user) {
                return res.send({
                    status: 200,
                    message: 'User updated successfully.'
                });
            }
        }).catch((error: Error) => {
            return res.status(500).send(error);
        });
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.post('/add', this.addUser);
        this.router.post('/update/:id', this.updateUser);
    }

}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;