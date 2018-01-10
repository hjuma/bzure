import {BusinessUnit} from '../core/models/business-unit';
import {Observable} from 'rxjs/Observable';
import {Barrier} from '../core/models/barrier';
import {BarrierElement} from '../core/models/barrier-element';
import {BarrierType} from '../core/models/barrier-type';

import 'rxjs/add/observable/of';

export class MockReferenceDataService {

    getAllBusinessUnits() {
        const businessUnits = Array<BusinessUnit>();
        return Observable.of(businessUnits);
    }

    saveBusinessUnit(businessUnit: any): Observable<any> {
        return Observable.of({});
    }

    addBusinessUnit(businessUnit: any): Observable<any> {
        return Observable.of({});
    }

    getBarriers() {
        const barriers = Array<Barrier>();
        return Observable.of(barriers);
    }

    saveBarrier(barrier: any): Observable<any> {
        return Observable.of({});
    }

    addBarrier(barrier: any): Observable<any> {
        return Observable.of({});
    }

    getAllBarrierElements() {
        const barrierElements = Array<BarrierElement>();

        return Observable.of(barrierElements);
    }

    saveBarrierElement(barrierElement: any): Observable<any> {
        return Observable.of({});
    }

    addBarrierElement(barrierElement: any): Observable<any> {
        return Observable.of({});
    }


    getAllBarrierTypes() {
      const barrierTypes = Array<BarrierType>();
      return Observable.of(barrierTypes);
    }

    saveBarrierType(barrierType: any): Observable<any> {
        return Observable.of({});
    }

    addBarrierType(barrierType: any): Observable<any> {
        return Observable.of({});
    }


}