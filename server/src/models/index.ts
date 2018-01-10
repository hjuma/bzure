import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import { configuration } from '../config/config';
//import { logger } from "../utils/logger";
import { AssetAttributes, AssetInstance } from './interfaces/asset';

import { Sequelize } from 'sequelize';
import { FacilityAttributes, FacilityInstance } from './interfaces/facility';
import { assetService } from '../services/asset';

export interface SequelizeModels {
    // Asset: SequelizeStatic.Model<AssetInstance, AssetAttributes>;
    // Facility: SequelizeStatic.Model<FacilityInstance, FacilityAttributes>;
}

class Database {
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = configuration.getDatabaseConfig();

        //if (dbConfig.logging) {
        //    dbConfig.logging = logger.info;
        //}

        (SequelizeStatic as any).cls = cls.createNamespace("sequelize-transaction");
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this._basename) && (file !== "interfaces");
        }).forEach((file: string) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });


       this.getSequelize().sync({force: false}).then(() => {
          console.log('Finished syncronising model with database');
       });

    }

    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
