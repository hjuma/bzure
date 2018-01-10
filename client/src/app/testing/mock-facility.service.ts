import { Facility } from '../core/models/facility';
import { WorkOrderLevelData } from '../core/models/work-order-level-data';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

export class MockFacilityService {

    getAllFacilities() {
        const facilities = Array<Facility>();
        return Observable.of(facilities);
    }

    getFacilityById(id: string) {
        const facility: Facility = {
            id: 1,
            code: 'TEST',
            name: 'Test',
            asset_id: 1,
            category: 'Test',
            created_at: Date.now(),
            updated_at: Date.now(),
            Asset: {
                id: 1,
                code: 'TEST',
                name: 'Test',
                business_unit_id: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
                Facilities: []
            },
            FacilityLevelData: [],
            AssetLevelData: []
        };
        return Observable.of(facility);
    }

    getDrillDownWorkOrders(id: number, barrierTypeId: number, barrierMetricId: number, ragStatus: string) {
        const workOrders = Array<WorkOrderLevelData>();

        workOrders.push( {
            snapshot_date: Date.now(),
            work_order_number: 'TEST',
            functional_location: 'TEST',
            facility_id: 1,
            barrier_element_id: 1,
            barrier_type_id: 1,
            barrier_metric_id: 1,
            rag_status: 'R',
            planner_group_id: 1,
            abc_indicator_id: 1,
            work_order_description: 'TEST',
            order_type: 'TEST',
            user_status: 'TEST',
            awaiting_deferment: 'Y',
            deferred: 'Y',
            work_centre: 'TEST',
            latest_allowable_finish_date: Date.now(),
            maint_activ_type: 'TEST',
            created_at: Date.now(),
            updated_at: Date.now(),
            Facility: {
                id: 1,
                code: 'TEST',
                name: 'Test',
                asset_id: 1,
                category: 'Test',
                created_at: Date.now(),
                updated_at: Date.now(),
                Asset: {
                    id: 1,
                    code: 'TEST',
                    name: 'Test',
                    business_unit_id: 1,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    Facilities: []
                },
                FacilityLevelData: [],
                AssetLevelData: []
            },
            BarrierType: {
                id: 1,
                asset_id: 1,
                barrier_id: 1,
                name: 'TEST',
                description: 'TEST',
                display_order: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
                Barrier: {
                    id: 1,
                    code: 'TEST',
                    name: 'TEST',
                    description: 'TEST',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    BarrierTypes: []
                }
            },
            BarrierMetric: {
                id: 1,
                barrier_element_id: 1,
                name: 'TEST',
                description: 'TEST',
                use_barriers: true,
                green_on_no_data: true,
                display_order: 1
            },
            PlannerGroup: {
                id: 1,
                code: 'TEST',
                asset_id: 1,
                description: 'TEST',
                created_at: Date.now(),
                updated_at: Date.now()
            },
            AbcIndicator: {
                id: 1,
                code: 'TEST',
                asset_id: 1,
                description: 'TEST',
                created_at: Date.now(),
                updated_at: Date.now()
            }
        });
        return Observable.of(workOrders);
    }

    getDrillDownDataQualityWorkOrders(id: number, barrierTypeId: number, barrierMetricId: number) {
        const workOrders = Array<WorkOrderLevelData>();

        workOrders.push( {
            snapshot_date: Date.now(),
            work_order_number: 'TEST',
            functional_location: 'TEST',
            facility_id: 1,
            barrier_element_id: 1,
            barrier_type_id: 1,
            barrier_metric_id: 1,
            rag_status: 'R',
            planner_group_id: 1,
            abc_indicator_id: 1,
            work_order_description: 'TEST',
            order_type: 'TEST',
            user_status: 'TEST',
            awaiting_deferment: 'Y',
            deferred: 'Y',
            work_centre: 'TEST',
            latest_allowable_finish_date: Date.now(),
            maint_activ_type: 'TEST',
            created_at: Date.now(),
            updated_at: Date.now(),
            Facility: {
                id: 1,
                code: 'TEST',
                name: 'Test',
                asset_id: 1,
                category: 'Test',
                created_at: Date.now(),
                updated_at: Date.now(),
                Asset: {
                    id: 1,
                    code: 'TEST',
                    name: 'Test',
                    business_unit_id: 1,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    Facilities: []
                },
                FacilityLevelData: [],
                AssetLevelData: []
            },
            BarrierType: {
                id: 1,
                asset_id: 1,
                barrier_id: 1,
                name: 'TEST',
                description: 'TEST',
                display_order: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
                Barrier: {
                    id: 1,
                    code: 'TEST',
                    name: 'TEST',
                    description: 'TEST',
                    display_order: 1,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    BarrierTypes: []
                }
            },
            BarrierMetric: {
                id: 1,
                barrier_element_id: 1,
                name: 'TEST',
                description: 'TEST',
                use_barriers: true,
                green_on_no_data: true,
                display_order: 1
            },
            PlannerGroup: {
                id: 1,
                code: 'TEST',
                asset_id: 1,
                description: 'TEST',
                created_at: Date.now(),
                updated_at: Date.now()
            },
            AbcIndicator: {
                id: 1,
                code: 'TEST',
                asset_id: 1,
                description: 'TEST',
                created_at: Date.now(),
                updated_at: Date.now()
            }
        });
        return Observable.of(workOrders);
    }

    saveFacility(facility: any): Observable<any> {
       return Observable.of({});
    }

    addFacility(facility: any): Observable<any> {
        return Observable.of({});
    }
}