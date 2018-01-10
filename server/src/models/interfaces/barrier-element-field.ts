import { Instance } from 'sequelize';

export interface BarrierElementFieldAttributes {

    id : number;
    barrier_element_id: number;
    field_name: string;
    display_name: string;
    display_order: number;
}

export interface BarrierElementFieldInstance extends Instance<BarrierElementFieldAttributes> {
    dataValues: BarrierElementFieldAttributes;
}