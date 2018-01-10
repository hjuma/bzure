import { Barrier } from '../core/models/barrier';
import { BarrierElement } from '../core/models/barrier-element';
import { Observable } from 'rxjs/Observable';
import { Asset } from '../core/models/asset';

import 'rxjs/add/observable/of';

export class MockMetadataService {

    getBarriers(asset_id: number) {
        const barriers = Array<Barrier>();
        return Observable.of(barriers);
    }

    getBarrierElements() {
        const elements = Array<BarrierElement>();
        return Observable.of(elements);
    }

    getAllBarriers(asset_id: number) {
        const barriers = Array<Barrier>();
        return Observable.of(barriers);
    }

    getAllBarrierElements() {
        const elements = Array<BarrierElement>();
        return Observable.of(elements);
    }

    getAssetsById(asset_id: number) {
        let asset: Asset = {
            id: 1,
            code: 'TEST',
            name: 'Test',
            business_unit_id: 1,
            Facilities: [],
            created_at: Date.now(),
            updated_at: Date.now(),
        };
        return Observable.of(asset);
    }
}