// export for convenience.
import { Subject } from 'rxjs/Subject';

export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import 'rxjs/add/observable/from';

@Directive({
    selector: '[routerLink], [routerLinkActive]',
    host: {
        '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    @Input('queryParams') queryParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Directive({
    selector: '[queryParams]',
})
export class QueryParamsStubDirective {
    @Input('queryParams') queryParams: any;
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
    public url;
    private subject = new Subject();

    public events = this.subject.asObservable();

    navigate(commands: any[], extras?: NavigationExtras) { }

    triggerNavEvents(url) { }
}


// Only implements params and part of snapshot.paramMap
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.paramMap is Observable
    private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
    paramMap = this.subject.asObservable();

    queryParams = Observable.of({});

    // Test parameters
    private _testParamMap: ParamMap;
    get testParamMap() { return this._testParamMap; }
    set testParamMap(params: {}) {
        this._testParamMap = convertToParamMap(params);
        this.subject.next(this._testParamMap);
    }

    get params() {

        return Observable.from([{id: 1}]);
    }

    // ActivatedRoute.snapshot.paramMap
    get snapshot() {
        return { paramMap: this.testParamMap };
    }

}

