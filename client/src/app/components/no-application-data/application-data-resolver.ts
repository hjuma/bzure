import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ReferenceDataService } from '../../core/services/reference-data.service';
import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ApplicationDataResolver implements Resolve<any> {
    constructor(private referenceDataService: ReferenceDataService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot) {
        const self = this;
        self.referenceDataService.checkApplicationDataExistence().subscribe((response) => {
            const referenceEntities = response;
            referenceEntities.forEach(function (element) {
                if (element.COUNT === 0) {
                    reject(response);
                    self.router.navigate(['/home/no-application-data-found']);
                }
            });
            return resolve(response);
        });
    }

}
