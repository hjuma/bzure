import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService implements OnInit {
  private API_BASE = environment.endPoints.apiBase;
  private USERS = environment.endPoints.users;
  private ADD_USER = environment.endPoints.add;
  private UPDATE_USER = environment.endPoints.update;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  getUsers() {
    return this.http.get<Array<User>>(this.API_BASE + this.USERS);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post<User>(this.API_BASE + this.USERS + '/' + this.UPDATE_USER + `/${user.id}`, user);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<User>(this.API_BASE + this.USERS + '/' + this.ADD_USER, user);
  }

  getUser(id: String) {
      return this.http.get<User>(this.API_BASE + this.USERS + `/${id}`);
  }

}
