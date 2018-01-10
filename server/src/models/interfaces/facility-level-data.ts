import { Instance } from 'sequelize';

export interface FacilityLevelDataAttributes {

    snapshot_date : Date;
    facility_id : Number;
    barrier_type_id : Number;
    barrier_metric_id : Number;
    count_of_data : Number;
    rag_status : String;
    
 
}

export interface FacilityLevelDataInstance extends Instance<FacilityLevelDataAttributes> {
    dataValues: FacilityLevelDataAttributes;
}