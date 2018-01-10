import {Observable} from 'rxjs/Observable';
import {AssetRuleSet} from '../core/models/asset-rule-set';
import {FacilityRuleSet} from '../core/models/facility-rule-set';

import 'rxjs/add/observable/of';

export class MockRulesetService {
    getAssetRuleSet(): Observable<Array<AssetRuleSet>> {
        const rules = Array<AssetRuleSet>();
        return Observable.of(rules);
    }

    getAssetRuleSetHistory(barrier_id: number): Observable<Array<AssetRuleSet>> {
        const rules = Array<AssetRuleSet>();

        rules.push({
            barrier_id: 1,
            version_no: 1,
            amber_start: 1,
            amber_end: 1,
            updated_by: 'TEST',
            update_comment: 'TEST',
            current_flag: true,
            start_dt: Date.now(),
            end_dt: Date.now(),
            Barrier: {
                id: 1,
                code: 'TEST',
                name: 'TEST',
                description: 'TEST',
                display_order: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
                BarrierTypes: [{
                    id: 1,
                    asset_id: 1,
                    barrier_id: 1,
                    name: 'TEST',
                    description: 'TEST',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                }]
            }
        });
        
        return Observable.of(rules);
    }

    getFacilityRuleSet(): Observable<Array<FacilityRuleSet>> {
        const rules = Array<FacilityRuleSet>();
        return Observable.of(rules);
    }

    getFacilityRuleSetHistory(barrier_id: number, barrier_metric_id: number): Observable<Array<FacilityRuleSet>> {
        const rules = Array<FacilityRuleSet>();
        
        return Observable.of(rules);
    }

    updateAssetRuleSet(assetRuleSet: any): Observable<any> {
        return Observable.of({});
    }

    updateFacilityRuleSet(facilityRuleSet: any): Observable<any> {
        return Observable.of({});
    }

}