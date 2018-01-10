import { Instance } from 'sequelize';

export interface AssetLevelDataAttributes {
    snapshot_date : Date;
    facility_id : Number;
    barrier_type_id : Number;
    count_of_data : Number;
    rag_status : String;
    red_count : Number;
    amber_count : Number;
    green_count : Number;

 
}

export interface AssetLevelDataInstance extends Instance<AssetLevelDataAttributes> {
    dataValues: AssetLevelDataAttributes;
}