import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    /**
     * Determines if the given route can be activated based on session state
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<boolean> | boolean}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const returnUrl = state.url;

        return this.isLoggedIn(returnUrl);
    }

    /**
     * Determines if the given route can be activated based on session state
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<boolean> | boolean}
     */
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }


    /**
     * Determines if the user has a valid logged in session
     * @param {string} returnUrl
     * @return {boolean}
     */
    isLoggedIn(returnUrl: string) {
        if (this.authenticationService.isLoggedIn) {
            return true;
        }
        this.authenticationService.redirectUrl = returnUrl;
        this.router.navigate(['/login']).then(() => {
            this.authenticationService.isLoggedIn = false;
            return false;
        });
    }


}
