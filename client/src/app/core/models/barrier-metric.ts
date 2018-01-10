export interface BarrierMetric {
    id: number;
    barrier_element_id: number;
    name: string;
    description: string;
    use_barriers: boolean;
    green_on_no_data: boolean;
    display_order: number;
}
