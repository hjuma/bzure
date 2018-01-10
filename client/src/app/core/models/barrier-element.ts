import { BarrierMetric } from './barrier-metric';

export interface BarrierElement {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    BarrierMetrics: Array<BarrierMetric>;
}
