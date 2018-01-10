import { BusinessUnit } from './business-unit';

export interface UserSession {
    user: {
        id: number;
        username: string;
        status: string;
        role: {
            id: number;
            name: string;
            description: string;
        };
        business_unit: BusinessUnit;
    };
    auth: {
        token: string;
    };
}
