import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {AssetRuleSet} from '../../../core/models/asset-rule-set';
import {ToasterService} from 'angular2-toaster';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AssetService} from '../../../core/services/asset.service';
import {Asset} from '../../../core/models/asset';
import {Barrier} from '../../../core/models/barrier';
import {MetadataService} from '../../../core/services/metadata.service';
import {isNullOrUndefined} from 'util';
import {Facility} from '../../../core/models/facility';
import {BarrierType} from '../../../core/models/barrier-type';

@Component({
    selector: 'app-asset-rule-set',
    templateUrl: './asset-rule-set.component.html',
    styleUrls: ['./asset-rule-set.component.scss']
})
export class AssetRuleSetComponent implements OnInit {
    assetRuleSet: Array<AssetRuleSet>;
    editingRule: number = -1;
    editingRuleSet: AssetRuleSet;
    showCounts = false;

    assets: Array<Asset>;
    selectedAsset: Asset;
    barriers: Array<Barrier>;


    constructor(private assetRuleSetService: RuleSetService,
                private assetService: AssetService,
                private toasterService: ToasterService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private metadataService: MetadataService) { }

    ngOnInit() {
        this.getRuleSet();
    }

    private getRuleSet() {
        this.assetRuleSetService.getAssetRuleSet().subscribe(ruleSet => {
            this.assetRuleSet = ruleSet;
            this.assetService.getAssets().subscribe(response => {
                this.assets = response;
                this.selectedAsset = this.assets[1];
                this.onAssetChange();
            });
        });
    }

    updateRule(rule) {

        rule['updated_by'] = this.authenticationService.UserSession.user.username;

        this.assetRuleSetService.updateAssetRuleSet(rule).subscribe((response) => {
            this.getRuleSet();
            this.toasterService.pop('success', 'Success!', response['message']);
            this.editingRule = -1;
        });

    }

    editRule(index: number, rule: AssetRuleSet) {
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
            });
        }
    }

    getCountForBarrierType(facility: Facility, barrierType: BarrierType) {
        const count = facility.AssetLevelData.find(function(data) {
            return data.barrier_type_id === barrierType.id;
        });

        return isNullOrUndefined(count) ? { rag: 'G', count: 0} : { rag: count.rag_status, count: count.count_of_data};
    }

    getPreviewCountForBarrierType(facility: Facility, barrierType: BarrierType) {
        const count = facility.AssetLevelData.find(function(data) {
            return data.barrier_type_id === barrierType.id;
        });

        let preview_rag;

        const previewBarrier = this.assetRuleSet.find(function(rule) {
            return rule.barrier_id === barrierType.barrier_id;
        });

        if (!isNullOrUndefined(count)) {

            if (count.red_count > previewBarrier.amber_end) {
                preview_rag = 'R';
            } else if (count.amber_count >= previewBarrier.amber_start) {
                preview_rag = 'A';
            } else {
                preview_rag = 'G';
            }
        }

        return isNullOrUndefined(count) ? { rag: 'G', count: 0} : { rag: preview_rag, count: count.count_of_data};
    }

}
