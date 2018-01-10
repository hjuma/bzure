import { Instance } from 'sequelize';

export interface BusinessUnitAttributes {
 
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    name : String;
    description : String;
    end_dt : Date;
 
}

export interface BusinessUnitInstance extends Instance<BusinessUnitAttributes> {
    dataValues: BusinessUnitAttributes;
}