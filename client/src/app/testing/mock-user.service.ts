import {Observable} from 'rxjs/Observable';
import {User} from '../core/models/user';

import 'rxjs/add/observable/of';

export class MockUserService {
    getUsers() {
        const users = Array<User>();
        return Observable.of(users);
    }

    saveUser(user: any): Observable<any> {
       return Observable.of({});
    }

    addUser(user: any): Observable<any> {
        return Observable.of({});
    }
}