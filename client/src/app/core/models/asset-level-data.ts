import { BarrierType } from './barrier-type';

export interface AssetLevelData {
    snapshot_date: number;
    facility_id: number;
    barrier_type_id: number;
    count_of_data: number;
    rag_status: string;
    red_count: number;
    amber_count: number;
    green_count: number;
    created_at: string;
    updated_at: string;
    BarrierType: BarrierType;
}
