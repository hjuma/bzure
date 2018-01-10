import { Instance } from 'sequelize';

export interface RoleAttributes {
 

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    name : String;
    description : String;
    end_dt : Date;
 
}

export interface RoleInstance extends Instance<RoleAttributes> {
    dataValues: RoleAttributes;
}