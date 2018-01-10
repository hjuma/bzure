import { IDatabaseConfig } from './interfaces/database-config';

export const DATABASE_CONFIG_LOCAL_DEVELOPMENT = 0;
export const DATABASE_CONFIG_AZURE_DEVELOPMENT = 1;
export const DATABASE_CONFIG_AZURE_PRODUCTION = 2;

export const DatabaseConfig: Array<IDatabaseConfig> =  [
    {
        username: "brmdl",
        password: "barrier123!",
        database: "barrier",
        host: "localhost",
        dialect: "mssql",
        logging: true,
        force: false,
        timezone: "+00:00"
    },
    {
        username: "brmdl",
        password: "barrier123!",
        database: "barrier",
        host: "azsu-d-db-132",
        dialect: "mssql",
        logging: false,
        force: false,
        timezone: "+00:00"
    },
    {
        username: "brmdl",
        password: "barrier123!",
        database: "barrier",
        host: "azsu-d-db-132",
        dialect: "mssql",
        logging: false,
        force: false,
        timezone: "+00:00"
    },
    {
        username: "brmdl",
        password: "barrier123!",
        database: "barrier",
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        logging: true,
        force: false,
        timezone: "+00:00"
    }
];