import { Component, OnInit } from '@angular/core';
import {FacilityService} from '../../core/services/facility.service';
import {WorkOrderLevelData} from '../../core/models/work-order-level-data';
import {ActivatedRoute} from '@angular/router';
import {Facility} from '../../core/models/facility';
import { BarrierElementField } from '../../core/models/barrier-element-field';
import { BarrierElement } from '../../core/models/barrier-element';

@Component({
  selector: 'app-facility-work-order',
  templateUrl: './facility-work-order.component.html',
  styleUrls: ['./facility-work-order.component.scss']
})
export class FacilityWorkOrderComponent implements OnInit {
  workOrderData: Array<WorkOrderLevelData>;
  selectedFacility: Facility;

  barrier: string;
  barrierType: string;
  barrierMetric: string;
  ragStatus: string;
  displayFields: Array<BarrierElementField>;

  constructor(private facilityService: FacilityService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
          const facilityId = params['id'];
          const barrierTypeId = params['barrierTypeId'];
          const barrierMetricId = params['metricTypeId'];
          const ragStatus = params['ragStatus'];

          this.facilityService.getFacilityById(facilityId).subscribe((facility: Facility) => {
              this.selectedFacility = facility;

              this.facilityService.getDrillDownWorkOrders(facilityId, barrierTypeId, barrierMetricId, ragStatus)
                  .subscribe((workOrders: Array<WorkOrderLevelData>) => {
                      this.workOrderData = workOrders;

                      if (this.workOrderData.length>0) {

                          this.facilityService.getDrillDownWorkOrderFields(this.workOrderData[0].barrier_element_id).subscribe((res: Array<BarrierElementField>) => {

                              this.displayFields = res;
                              this.barrier = this.workOrderData[0]['BarrierType.Barrier.name'] || '';
                              this.barrierType = this.workOrderData[0]['BarrierType.name'] || '';
                              this.barrierMetric = this.workOrderData[0]['BarrierMetric.name']  || '';
                              this.ragStatus = this.workOrderData[0]['rag_status'] == 'G' ? 'GREEN' :  this.workOrderData[0]['rag_status'] == 'A' ? 'AMBER' : this.workOrderData[0]['rag_status'] == 'R' ? 'RED' : '';
                          });


                      }
                  });

          });



      });
  }


}
