import {Barrier} from './barrier';

export interface AssetRuleSet {
    barrier_id: number;
    version_no: number;
    amber_start: number;
    amber_end: number;
    updated_by: string;
    update_comment: string;
    current_flag: boolean;
    start_dt: number;
    end_dt: number;
    Barrier?: Barrier;
}
