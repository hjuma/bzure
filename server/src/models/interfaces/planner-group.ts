import { Instance } from 'sequelize';

export interface PlannerGroupAttributes {
   

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code : String;
    asset_id : Number;
    description: String;
    end_dt : Date;
  
}

export interface PlannerGroupInstance extends Instance<PlannerGroupAttributes> {
    dataValues: PlannerGroupAttributes;
}