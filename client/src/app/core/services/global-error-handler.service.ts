import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor() {

    }
    /**
     * Overrides global error handling to pop toaster, only displays error in console for
     * non production builds
     * @param {Error} error
     * @return {void}
     */
    handleError(error) {
        if (!environment.production) {
            console.log(error);
        }
    }
}

