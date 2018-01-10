import { Instance } from 'sequelize';

export interface BarrierTypeAttributes {
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    asset_id : Number;
    barrier_id : Number;
    name : String;
    description: String;
    display_order: Number;
    end_dt : Date;
}

export interface BarrierTypeInstance extends Instance<BarrierTypeAttributes> {
    dataValues: BarrierTypeAttributes;
}