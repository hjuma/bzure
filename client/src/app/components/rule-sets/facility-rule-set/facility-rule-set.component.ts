import { Component, OnInit } from '@angular/core';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {FacilityRuleSet} from '../../../core/models/facility-rule-set';
import {ToasterService} from 'angular2-toaster';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {NgForm} from '@angular/forms';
import {Asset} from '../../../core/models/asset';
import {Barrier} from '../../../core/models/barrier';
import {AssetService} from '../../../core/services/asset.service';
import {MetadataService} from '../../../core/services/metadata.service';
import {Facility} from '../../../core/models/facility';
import {FacilityService} from '../../../core/services/facility.service';
import {BarrierElement} from '../../../core/models/barrier-element';
import {BarrierMetric} from '../../../core/models/barrier-metric';
import {BarrierType} from '../../../core/models/barrier-type';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-facility-rule-set',
    templateUrl: './facility-rule-set.component.html',
    styleUrls: ['./facility-rule-set.component.scss']
})
export class FacilityRuleSetComponent implements OnInit {
    facilityRuleSet: Array<FacilityRuleSet>;
    editingRule: number = -1;
    editingRuleSet: FacilityRuleSet;
    showCounts = false;

    assets: Array<Asset>;
    facilities: Array<Facility>;
    selectedAsset: Asset;
    selectedFacility: Facility;
    selectedFacilityData: Facility;
    barriers: Array<Barrier>;

    barrierElements: Array<BarrierElement>;

    constructor(private facilityRuleSetService: RuleSetService,
                private toasterService: ToasterService,
                private assetService: AssetService,
                private facilityService: FacilityService,
                private authenticationService: AuthenticationService,
                private metadataService: MetadataService) { }

    ngOnInit() {
        this.getRuleSet();
    }

    private getRuleSet() {
        this.facilityRuleSetService.getFacilityRuleSet().subscribe(ruleSet => {
            this.facilityRuleSet = ruleSet;
            this.assetService.getAssets().subscribe(response => {
                this.assets = response;
                this.selectedAsset = this.assets[1];
                this.onAssetChange();
            });
        });
    }

    updateRule(rule) {

        rule['updated_by'] = this.authenticationService.UserSession.user.username;

        this.facilityRuleSetService.updateFacilityRuleSet(rule).subscribe((response) => {
            this.getRuleSet();
            this.toasterService.pop('success', 'Success!', response['message']);
            this.editingRule = -1;
        });

    }

    editRule(index: number, rule: FacilityRuleSet) {
        this.editingRule = index;
        this.editingRuleSet = JSON.parse(JSON.stringify(rule));
        rule.update_comment = '';
    }

    cancelEditRule(rule, form: NgForm) {
        this.editingRule = -1;
        rule.amber_start = this.editingRuleSet.amber_start;
        rule.amber_end = this.editingRuleSet.amber_end;
        rule.update_comment = this.editingRuleSet.update_comment;
        form.form.markAsPristine();
        form.form.markAsUntouched();
    }

    onAssetChange() {
        if (this.selectedAsset) {
            this.metadataService.getBarriers(this.selectedAsset.id).subscribe(barriers => {
                this.barriers = barriers;
                this.facilities = this.selectedAsset.Facilities;
                this.selectedFacility = this.facilities[0];
                this.onFacilityChange();
            });
        }
    }

    onFacilityChange() {

        this.facilityService.getFacilityById(this.selectedFacility.id.toString()).subscribe(facility => {
            this.selectedFacilityData = facility;
            this.metadataService.getBarriers(+this.selectedFacility.asset_id).subscribe(barriers => {
                this.barriers = barriers;

                this.metadataService.getBarrierElements().subscribe(elements => {
                    this.barrierElements = elements;
                });
            });
        });
    }

    getCountForBarrierMetric(metric: BarrierMetric, barrierType: BarrierType) {
        const count = this.selectedFacilityData.FacilityLevelData.find(function(data) {
            return data.barrier_type_id === barrierType.id && data.barrier_metric_id === metric.id;
        });

        return isNullOrUndefined(count) ? { rag: 'G', count: 0} : { rag: count.rag_status, count: count.count_of_data};
    }

    getPreviewCountForBarrierMetric(metric: BarrierMetric, barrierType: BarrierType) {
        const count = this.selectedFacilityData.FacilityLevelData.find(function(data) {
            return data.barrier_type_id === barrierType.id && data.barrier_metric_id === metric.id;
        });

        let preview_rag;

        const previewBarrier = this.facilityRuleSet.find(function(rule) {
            return rule.barrier_id === barrierType.barrier_id && rule.barrier_metric_id === metric.id;
        });

        if (!isNullOrUndefined(count)) {

            if (count.count_of_data > previewBarrier.amber_end) {
                preview_rag = 'R';
            } else if (count.count_of_data >= previewBarrier.amber_start) {
                preview_rag = 'A';
            } else {
                preview_rag = 'G';
            }
        }

        return isNullOrUndefined(count) ? { rag: 'G', count: 0} : { rag: preview_rag, count: count.count_of_data};
    }
}
