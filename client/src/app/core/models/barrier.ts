import { BarrierType } from './barrier-type';

export interface Barrier {
    id: number;
    code: string;
    name: string;
    description: string;
    display_order: number;
    created_at: number;
    updated_at: number;
    BarrierTypes: Array<BarrierType>;
}
