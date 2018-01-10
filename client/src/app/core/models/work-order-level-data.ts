import {BarrierType} from './barrier-type';
import {BarrierMetric} from './barrier-metric';
import {Facility} from './facility';
import {PlannerGroup} from './planner-group';
import {AbcIndicator} from './abc-indicator';

export interface WorkOrderLevelData {
    snapshot_date: number;
    work_order_number: string;
    functional_location: string;
    facility_id: number;
    barrier_element_id: number;
    barrier_type_id: number;
    barrier_metric_id: number;
    rag_status: string;
    planner_group_id: number;
    abc_indicator_id: number;
    work_order_description: string;
    order_type: string;
    user_status: string;
    awaiting_deferment: string;
    deferred: string;
    work_centre: string;
    latest_allowable_finish_date: number;
    maint_activ_type: string;
    created_at: number;
    updated_at: number;
    Facility?: Facility;
    BarrierType?: BarrierType;
    BarrierMetric?: BarrierMetric;
    PlannerGroup?: PlannerGroup;
    AbcIndicator?: AbcIndicator;
}
