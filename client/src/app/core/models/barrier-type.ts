import { Barrier } from './barrier';

export interface BarrierType {
    id: number;
    asset_id: number;
    barrier_id: number;
    name: string;
    description: string;
    display_order: number;
    created_at: number;
    updated_at: number;
    Barrier?: Barrier;
}
