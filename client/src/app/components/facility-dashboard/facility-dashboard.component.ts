import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FacilityService} from '../../core/services/facility.service';
import {Facility} from '../../core/models/facility';
import 'rxjs/add/operator/switchMap';
import {MetadataService} from '../../core/services/metadata.service';
import {Barrier} from '../../core/models/barrier';
import {BarrierElement} from '../../core/models/barrier-element';
import {BarrierMetric} from '../../core/models/barrier-metric';
import {BarrierType} from '../../core/models/barrier-type';
import {isNullOrUndefined} from 'util';
import {facilityService} from '../../../../../server/src/services/facility';

@Component({
    selector: 'app-facility-dashboard',
    templateUrl: './facility-dashboard.component.html',
    styleUrls: ['./facility-dashboard.component.scss']
})
export class FacilityDashboardComponent implements OnInit {
    selectedFacility: Facility;
    barriers: Array<Barrier>;
    showCounts = false;
    barrierElements: Array<BarrierElement>;
    showLatencyAlert = false;

    constructor(private route: ActivatedRoute,
                private facilityService: FacilityService,
                private metadataService: MetadataService,
                private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const facilityId = params['id'];

            this.facilityService.getFacilityById(facilityId).subscribe((facility: Facility) => {
                this.selectedFacility = facility;
                this.metadataService.getBarriers(+this.selectedFacility.asset_id).subscribe((barriers: Array<Barrier>) => {
                    this.barriers = barriers;

                    this.metadataService.getBarrierElements().subscribe((elements: Array<BarrierElement>) => {
                       this.barrierElements = elements;
                       this.shouldShowLatencyAlert();
                    });
                });
            });

        });
    }

    getCountForBarrierMetric(metric: BarrierMetric, barrierType: BarrierType) {
        const count = this.selectedFacility.FacilityLevelData.find(function(data) {
            return data.barrier_type_id === barrierType.id && data.barrier_metric_id === metric.id;
        });

        let nullCount = { rag: 'G', count: 0};
        if (isNullOrUndefined(count)) {
            if (!metric.green_on_no_data) {
                nullCount = { rag: '', count: 0};
            }
        }

        return isNullOrUndefined(count) ? nullCount : { rag: count.rag_status, count: count.count_of_data};
    }

    getCountForNonBarrierMetric(metric: BarrierMetric) {
        const count = this.selectedFacility.FacilityLevelData.find(function(data) {
           return data.barrier_metric_id === metric.id;
        });

        return isNullOrUndefined(count) ? 0 : count.count_of_data;
    }

    onRagClick(metric: BarrierMetric, barrierType: BarrierType, rag: string) {
        this.router.navigate(['/home/facility/', this.selectedFacility.id, barrierType.id, metric.id, rag]);
    }

    onNonBarrierCountClick(metric: BarrierMetric) {
        this.router.navigate(['/home/facility/', this.selectedFacility.id, -1, metric.id, 'unassigned']);
    }


    hasOldData(metric: BarrierMetric) {
        let hasOldData = false;
        const yesterdayFull =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const yesterdayNoTime = new Date(yesterdayFull.getFullYear(), yesterdayFull.getMonth(), yesterdayFull.getDate());

        const count = this.selectedFacility.FacilityLevelData.find(function(data) {
            return data.barrier_metric_id === metric.id;
        });

        if (!isNullOrUndefined(count)) {
            const snapshotDate = new Date(count.snapshot_date);
            const snapshotDateNoTime = new Date(snapshotDate.getFullYear(), snapshotDate.getMonth(), snapshotDate.getUTCDate());

            if (snapshotDateNoTime < yesterdayNoTime) {
                hasOldData = true;
            }
        }

        return hasOldData;
    }

    getColSpan() {
        let colSpan = 0;

        this.barriers.forEach(function (barrier) {
            colSpan += barrier.BarrierTypes.length;
        });

        return colSpan;
    }

    private shouldShowLatencyAlert() {
        let showAlert = false;

        const yesterdayFull =  new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        const yesterdayNoTime = new Date(yesterdayFull.getFullYear(), yesterdayFull.getMonth(), yesterdayFull.getDate());

        this.selectedFacility.FacilityLevelData.forEach(function(count) {
                const snapshotDate = new Date(count.snapshot_date);
                const snapshotDateNoTime = new Date(snapshotDate.getFullYear(), snapshotDate.getMonth(), snapshotDate.getUTCDate());

                if (snapshotDateNoTime < yesterdayNoTime) {
                    showAlert = true;
                }

        });

        this.showLatencyAlert = showAlert;

    }

}
