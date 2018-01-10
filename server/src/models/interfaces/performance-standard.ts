import { Instance } from 'sequelize';

export interface PerformanceStandardAttributes {
 

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code : String;
    asset_id : Number;
    barrier_type_id : Number;
    description : String;
    end_dt : Date;

   
  
}

export interface PerformanceStandardInstance extends Instance<PerformanceStandardAttributes> {
    dataValues: PerformanceStandardAttributes;
}