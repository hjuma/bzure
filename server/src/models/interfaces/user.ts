import { Instance } from 'sequelize';

export interface UserAttributes {
    id : Number;
    start_dt : Date;
    current_flag : Boolean;
    business_unit_id: number;
    role_id: number;
    first_name: string,
    last_name : string;
    username: string;
    email: string;
    password: string;
    salt:string;
    last_login: Date;
    version_no : Number;    
    status: string;
    end_dt : Date;
}

export interface UserInstance extends Instance<UserAttributes> {
    dataValues: UserAttributes;
}