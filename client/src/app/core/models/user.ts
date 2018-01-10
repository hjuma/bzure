import { Role } from './role';
import { BusinessUnit } from './business-unit';

export interface User {
    id: number;
    business_unit_id: number;
    BusinessUnit?: BusinessUnit;
    Role?: Role;
    role_id: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirm_password: string;
    email: string;
    last_login: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
}
