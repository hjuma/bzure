import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../../core/services/facility.service';
import { WorkOrderLevelData } from '../../core/models/work-order-level-data';
import { ActivatedRoute } from '@angular/router';
import { Facility } from '../../core/models/facility';
import { BarrierElementField } from '../../core/models/barrier-element-field';

@Component({
    selector: 'app-data-quality-work-order',
    templateUrl: './data-quality-work-order.component.html',
    styleUrls: ['./data-quality-work-order.component.scss']
})
export class DataQualityWorkOrderComponent implements OnInit {
    workOrderData: Array<WorkOrderLevelData>;
    selectedFacility: Facility;
    displayFields: Array<BarrierElementField>;


    constructor(private facilityService: FacilityService,
        private route: ActivatedRoute, ) { }


    ngOnInit() {
       this.route.params.subscribe(params => {
            const facilityId = params['id'];
            const barrierTypeId = params['barrierTypeId'];
            const barrierMetricId = params['metricTypeId'];

            this.facilityService.getFacilityById(facilityId).subscribe((facility: Facility) => {
                this.selectedFacility = facility;

                this.facilityService.getDrillDownDataQualityWorkOrders(facilityId, barrierTypeId, barrierMetricId)
                    .subscribe((workOrders: Array<WorkOrderLevelData>) => {
                        this.workOrderData = workOrders;

                        if (this.workOrderData.length>0) {

                            this.facilityService.getDrillDownWorkOrderFields(this.workOrderData[0].barrier_element_id).subscribe((res: Array<BarrierElementField>) => {
                                this.displayFields = res;
                            });


                        }

                    });
            });
        });
    }


}
