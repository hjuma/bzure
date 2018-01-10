import { Instance } from 'sequelize';

export interface PerformanceStandardMappingAttributes {
 

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code  : String;
    asset_id : Number;
    ps_id : Number;
    description : String;
    end_dt : Date;
 
}

export interface PerformanceStandardMappingInstance extends Instance<PerformanceStandardMappingAttributes> {
    dataValues: PerformanceStandardMappingAttributes;
}