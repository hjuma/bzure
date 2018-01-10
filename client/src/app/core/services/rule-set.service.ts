import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AssetRuleSet} from '../models/asset-rule-set';
import {Observable} from 'rxjs/Observable';
import {FacilityRuleSet} from '../models/facility-rule-set';

@Injectable()
export class RuleSetService {
    private API_BASE = environment.endPoints.apiBase;
    private RULE_SET = environment.endPoints.ruleSet;

    constructor(private http: HttpClient) { }


    getAssetRuleSet(): Observable<Array<AssetRuleSet>> {
        return this.http.get<Array<AssetRuleSet>>(this.API_BASE + this.RULE_SET + '/asset');
    }

    getAssetRuleSetHistory(barrier_id: number): Observable<Array<AssetRuleSet>> {
        return this.http.get<Array<AssetRuleSet>>(this.API_BASE + this.RULE_SET + `/asset/history/${barrier_id}`);
    }

    getFacilityRuleSet(): Observable<Array<FacilityRuleSet>> {
        return this.http.get<Array<FacilityRuleSet>>(this.API_BASE + this.RULE_SET + '/facility');
    }

    getFacilityRuleSetHistory(barrier_id: number, barrier_metric_id: number): Observable<Array<FacilityRuleSet>> {
        return this.http.get<Array<FacilityRuleSet>>(this.API_BASE +
            this.RULE_SET +
            `/facility/history/${barrier_id}/${barrier_metric_id}`);
    }

    updateAssetRuleSet(assetRuleSet: any): Observable<any> {
        return this.http.put<any>(this.API_BASE + this.RULE_SET + '/asset', assetRuleSet);
    }

    updateFacilityRuleSet(facilityRuleSet: any): Observable<any> {
        return this.http.put<any>(this.API_BASE + this.RULE_SET + '/facility', facilityRuleSet);
    }

}
