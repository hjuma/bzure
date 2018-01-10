import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './can-component-deactivate';
import { ToasterService } from 'angular2-toaster';
import { BrowserService } from '../services/browser.service';

@Injectable()
export class UnSavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {

    constructor(private toaster: ToasterService, private browser: BrowserService) { }

    /**
     * Guards from route change if the route has a form that has unsaved changes
     * @param {CanComponentDeactivate} component
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @return {Observable<boolean> | Promise<boolean> | boolean}
     */
    canDeactivate(component: CanComponentDeactivate,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.browser.detectIE() !== false) {
            // Disable dirty checking in IE
            // https://github.com/angular/angular/issues/15299
            return Promise.resolve(true);
        }

        if (component.canDeactivate()) {
            return Promise.resolve(true);
        } else {
            this.toaster.pop('warning', 'You Have Unsaved Changes',
                'The form contains data you have not saved, please save or discard your changes');
            return Promise.resolve(false);
        }
    }
}
