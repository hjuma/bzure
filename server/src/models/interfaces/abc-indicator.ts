import { Instance } from 'sequelize';

export interface AbcIndicatorAttributes { 
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code : String;
    asset_id : Number;
    description : String;
    end_dt : Date;
}

export interface AbcIndicatorInstance extends Instance<AbcIndicatorAttributes> {
    dataValues: AbcIndicatorAttributes;
}