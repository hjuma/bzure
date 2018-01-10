import { Instance } from 'sequelize';

export interface FacilityAttributes {
 

    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    version_no : Number;
    code : String;
    asset_id : Number;
    name: String;
    category: String;
    end_dt : Date;
 

}

export interface FacilityInstance extends Instance<FacilityAttributes> {
    dataValues: FacilityAttributes;
}