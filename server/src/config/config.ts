import { IDatabaseConfig } from './interfaces/database-config';
import {
    DATABASE_CONFIG_AZURE_DEVELOPMENT, DATABASE_CONFIG_AZURE_PRODUCTION, DATABASE_CONFIG_LOCAL_DEVELOPMENT,
    DatabaseConfig
} from './database-config';

class Config {
    private databaseConfig: IDatabaseConfig;

    constructor() {
        const env: string = process.env['NODE_ENV'].toString();

        switch(env) {
            case "development":
                this.databaseConfig = DatabaseConfig[DATABASE_CONFIG_LOCAL_DEVELOPMENT];
                break;
            case "testing":
                this.databaseConfig = DatabaseConfig[DATABASE_CONFIG_AZURE_DEVELOPMENT];
                break;
            case "production":
                this.databaseConfig = DatabaseConfig[DATABASE_CONFIG_AZURE_PRODUCTION];
                break;
            default:
                this.databaseConfig = DatabaseConfig[DATABASE_CONFIG_LOCAL_DEVELOPMENT];

        }

    }

    getDatabaseConfig() {
        return this.databaseConfig;
    }

}

export const configuration = new Config();