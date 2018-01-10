import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable()
export class UserResolve implements Resolve<User> {

    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getUser(route.paramMap.get('id'));
    }
}
