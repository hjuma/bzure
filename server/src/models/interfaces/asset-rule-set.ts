import { Instance } from 'sequelize';

export interface AssetRuleSetAttributes {
 
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    barrier_id : Number;
    amber_start : Number;
    amber_end : Number;
    updated_by : String;
    update_comment: String;
    end_dt : Date;
}

export interface AssetRuleSetInstance extends Instance<AssetRuleSetAttributes> {
    dataValues: AssetRuleSetAttributes;
}