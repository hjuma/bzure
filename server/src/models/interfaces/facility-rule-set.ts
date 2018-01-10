import { Instance } from 'sequelize';

export interface FacilityRuleSetAttributes {
  

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    barrier_id : Number;
    barrier_metric_id : Number;
    amber_start : Number;
    amber_end : Number;
    update_comment: String;
    end_dt : Date;
    updated_by : String;
    version : Number;
}

export interface FacilityRuleSetInstance extends Instance<FacilityRuleSetAttributes> {
    dataValues: FacilityRuleSetAttributes;
}