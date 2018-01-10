import {Barrier} from './barrier';
import {BarrierMetric} from './barrier-metric';

export interface FacilityRuleSet {
    barrier_id: number;
    version_no: number;
    barrier_metric_id: number;
    amber_start: number;
    amber_end: number;
    updated_by: string;
    update_comment: string;
    current_flag: boolean;
    start_dt: Date;
    end_dt: Date;
    Barrier?: Barrier;
    BarrierMetric?: BarrierMetric;
}
