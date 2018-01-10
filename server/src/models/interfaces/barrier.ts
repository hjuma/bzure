import { Instance } from 'sequelize';

export interface BarrierAttributes {
 

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code: String;
    name : String;
    description: String;
    display_order: Number;
    end_dt : Date;
 
}

export interface BarrierInstance extends Instance<BarrierAttributes> {
    dataValues: BarrierAttributes;
}