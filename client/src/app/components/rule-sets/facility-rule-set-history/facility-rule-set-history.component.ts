import { Component, OnInit } from '@angular/core';
import {RuleSetService} from '../../../core/services/rule-set.service';
import {ActivatedRoute} from '@angular/router';
import {FacilityRuleSet} from '../../../core/models/facility-rule-set';

@Component({
    selector: 'app-facility-rule-set-history',
    templateUrl: './facility-rule-set-history.component.html',
    styleUrls: ['./facility-rule-set-history.component.scss']
})
export class FacilityRuleSetHistoryComponent implements OnInit {

    ruleHistory: Array<FacilityRuleSet>;
    activeRuleSet: FacilityRuleSet;
    barrierName: string;
    barrierMetricName: string;

    constructor(private ruleSetService: RuleSetService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const barrierId = params['barrier_id'];
            const barrierMetricId = params['barrier_metric_id'];

            this.ruleSetService.getFacilityRuleSetHistory(barrierId, barrierMetricId).subscribe(history => {
                this.ruleHistory = history.filter(function(data) {
                    return data.current_flag === false;
                });

                this.activeRuleSet = history.find(function(data) {
                    return data.current_flag === true;
                });

                if (this.ruleHistory.length>0) {
                    this.barrierName = this.ruleHistory[0].Barrier.name || 'UNKNOWN';
                    this.barrierMetricName = this.ruleHistory[0].BarrierMetric.name || 'UNKNOWN';
                }
            });
        });
    }

}
