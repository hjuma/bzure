import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UserSession } from '../models/user-session';
import { isNullOrUndefined } from 'util';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { JSEncrypt } from 'jsencrypt';

@Injectable()
export class AuthenticationService {
    private API_BASE = environment.endPoints.apiBase;
    private LOGIN = environment.endPoints.login;
    private RSA = environment.endPoints.rsa;
    private _encrypter: any;
    private _publicKey: string;
    private _subscription: any;
    isLoggedIn = false;
    redirectUrl: string;
    userSession: UserSession;

    constructor(private httpClient: HttpClient) {
        this._encrypter = new JSEncrypt();
        this.loadSession();
    }

    login(username: string, password: string): Observable<any> {

        return new Observable(observer => {
            this.getPublicKeys().subscribe(data => {
                this._publicKey = data['public_key'];
                this._encrypter.setKey(this._publicKey);
                const encryptedPassword: string = this.getEncryptedString(password);
                this.httpClient.post(this.API_BASE + this.LOGIN, {
                    username: username,
                    password: encryptedPassword
                }).subscribe(response => {
                    if (response['code'] === 200) {
                        this.userSession = response['data'];
                        this.isLoggedIn = true;
                        this.saveSession();
                    } else {
                        this.isLoggedIn = false;
                    }
                    observer.next(this.isLoggedIn);
                    observer.complete();
                }, error => {
                    this.isLoggedIn = false;
                    observer.next(error);
                    observer.complete();
                });
            });
        });
    }

    logout(): Observable<boolean> {
        return new Observable(observer => {
            this.clearSession();
            observer.next(this.isLoggedIn);
            observer.complete();
        });
    }

    getPublicKeys() {
        return this.httpClient.get(this.API_BASE + this.RSA);
    }

    /**
     * Get encrypted string
     * @param {string}
     * @return {string} Encrypted string
     */
    getEncryptedString(str: string): string {
        return this._encrypter.encrypt(str).toString('base64');
    }

    private saveSession() {
        localStorage.setItem('barrier-session', JSON.stringify(this.userSession));
    }

    private loadSession() {
        const storedSession = JSON.parse(localStorage.getItem('barrier-session'));

        if (storedSession !== null) {
            this.userSession = storedSession;
            this.isLoggedIn = true;
        }
    }

    private clearSession() {
        localStorage.removeItem('barrier-session');
        this.isLoggedIn = false;
        this.userSession = null;
    }

    get isSuperUser(): boolean {
        if (isNullOrUndefined(this.userSession)) {
            return false;
        }

        return this.userSession.user.role.name === 'Super User';
    }

    get isDatarUser(): boolean {
        if (isNullOrUndefined(this.userSession)) {
            return false;
        }

        return this.userSession.user.role.name === 'Data User';
    }

    get UserSession(): UserSession {
        return this.userSession;
    }

}
