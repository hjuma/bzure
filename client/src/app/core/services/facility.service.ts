import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Facility } from '../models/facility';
import { WorkOrderLevelData } from '../models/work-order-level-data';
import { Observable } from 'rxjs/Observable';
import { BarrierElementField } from '../models/barrier-element-field';

@Injectable()
export class FacilityService {
    private API_BASE = environment.endPoints.apiBase;
    private FACILITIES = environment.endPoints.facilities;
    private DATA_QUALITY = environment.endPoints.dataQuality;
    private ADD_FACILITY = environment.endPoints.add;
    private UPDATE_FACILITY = environment.endPoints.update;

    constructor(private http: HttpClient) { }

    getAllFacilities() {
        return this.http.get<Array<Facility>>(this.API_BASE + this.FACILITIES);
    }

    getFacilityById(id: string) {
        return this.http.get<Facility>(this.API_BASE + this.FACILITIES + `/${id}`);
    }

    getDrillDownWorkOrders(id: number, barrierTypeId: number, barrierMetricId: number, ragStatus: string) {
        return this.http.get<Array<WorkOrderLevelData>>(this.API_BASE +
            this.FACILITIES +
            `/${id}/${barrierTypeId}/${barrierMetricId}/${ragStatus}`);
    }

    getDrillDownWorkOrderFields(id: number) {
        return this.http.get<Array<BarrierElementField>>(this.API_BASE +
            this.FACILITIES +
            `/fields/${id}`);
    }

    getDrillDownDataQualityWorkOrders(id: number, barrierTypeId: number, barrierMetricId: number) {
        return this.http.get<Array<WorkOrderLevelData>>(this.API_BASE +
            this.FACILITIES +
            `/${id}/${barrierTypeId}/${barrierMetricId}`);
    }
}
