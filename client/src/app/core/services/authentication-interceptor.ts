import {Injectable, Injector} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private authenticationService: AuthenticationService;

    constructor(private injector: Injector, private toasterService: ToasterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authenticationService = this.injector.get(AuthenticationService);

        if (this.authenticationService.isLoggedIn) {
            const authenticatedRequest = req.clone({
                headers: req.headers.set('Authorization', this.authenticationService.userSession.auth.token)
            });

            return next.handle(authenticatedRequest);
        }

        return next.handle(req).do((event: HttpEvent<any>) => {

        }, (err: any) => {
            if (err.status === 403) {
                this.toasterService.pop('error', 'Ooops!', err['error']['err']);
            }
        });

    }
}
