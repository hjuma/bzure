import { BarrierType } from './barrier-type';
import { BarrierMetric } from './barrier-metric';

export interface FacilityLevelData {
    snapshot_date: number;
    facility_id: number;
    barrier_type_id: number;
    barrier_metric_id: number;
    count_of_data: number;
    rag_status: string;
    created_at: string;
    updated_at: string;
    BarrierType: BarrierType;
    BarrierMetric: BarrierMetric;
}
