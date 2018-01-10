import { Instance } from 'sequelize';

export interface BarrierElementAttributes {
 
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    name : String;
    end_dt : Date;
}

export interface BarrierElementInstance extends Instance<BarrierElementAttributes> {
    dataValues: BarrierElementAttributes;
}