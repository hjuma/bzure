import { Component, OnInit } from '@angular/core';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {ActivatedRoute} from '@angular/router';
import {AssetRuleSet} from '../../../core/models/asset-rule-set';

@Component({
    selector: 'app-asset-rule-set-history',
    templateUrl: './asset-rule-set-history.component.html',
    styleUrls: ['./asset-rule-set-history.component.scss']
})
export class AssetRuleSetHistoryComponent implements OnInit {

    ruleHistory: Array<AssetRuleSet>;
    activeRuleSet: AssetRuleSet;
    barrierName: string;


    constructor(private ruleSetService: RuleSetService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const barrierId = params['barrier_id'];

            this.ruleSetService.getAssetRuleSetHistory(barrierId).subscribe(history => {
               this.ruleHistory = history.filter(function(data) {
                   return data.current_flag === false;
               });

               this.activeRuleSet = history.find(function(data) {
                  return data.current_flag === true;
               });

               this.barrierName = this.ruleHistory.length > 0 ? this.ruleHistory[0].Barrier.name : 'UNKNOWN';
            });
        });
    }

}
