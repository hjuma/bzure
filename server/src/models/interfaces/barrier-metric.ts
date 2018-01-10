import { Instance } from 'sequelize';

export interface BarrierMetricAttributes {
  

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    barrier_element_id : Number;
    name : String;
    description: String;
    display_order: Number;
    use_barriers: boolean;
    green_on_no_data: boolean;
    end_dt : Date;
 
}

export interface BarrierMetricInstance extends Instance<BarrierMetricAttributes> {
    dataValues: BarrierMetricAttributes;
}