import { Instance } from 'sequelize';

export interface AssetAttributes {
 
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code : String;
    business_unit_id : Number;
    name : String;
    end_dt : Date;
}

export interface AssetInstance extends Instance<AssetAttributes> {
    dataValues: AssetAttributes;
}