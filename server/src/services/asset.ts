//import {logger} from "../utils/logger";
import { models, sequelize } from '../models/index';
import { AssetAttributes, AssetInstance } from '../models/interfaces/asset';
import { Sequelize, SequelizeStatic, Transaction } from 'sequelize';
import { FacilityInstance } from '../models/interfaces/facility';

export class AssetService {
    createAsset(assetAttributes: AssetAttributes): Promise<AssetInstance> {
        let promise = new Promise<AssetInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].create(assetAttributes).then((asset: AssetInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(asset);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

    retrieveAsset(code: string): Promise<AssetInstance> {
        let promise = new Promise<AssetInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].findOne({where: {code: code}}).then((asset: AssetInstance) => {
                    if (asset) {
                        //logger.info(`Retrieved product with name ${name}.`);
                    } else {
                        //logger.info(`Product with name ${name} does not exist.`);
                    }
                    resolve(asset);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

    retrieveAssetById(id: string):Promise<AssetInstance>{
        let promise = new Promise<AssetInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].findOne({where: {id: id}}).then((asset: AssetInstance) => {
                    if (asset) {
                        //logger.info(`Retrieved product with name ${name}.`);
                    } else {
                        //logger.info(`Product with name ${name} does not exist.`);
                    }
                    resolve(asset);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });
        return promise;
    }

    retrieveAssets(): Promise<Array<AssetInstance>> {
        let promise = new Promise<Array<AssetInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {

                return models['AssetLevelData'].find({
                   attributes: [[sequelize.fn('max', sequelize.col('snapshot_date')), 'max_snapshot_date']],
                    group: 'snapshot_date',
                    order: [
                        ['snapshot_date', 'DESC']
                    ]
                }, { transaction: t}).then(results => {
                    return models['Asset'].findAll(
                        {
                            where: {
                                id: { $ne: -1}
                            },
                            order: [
                                [sequelize.model('Facility'),'category', 'ASC'],
                                [sequelize.model('Facility'),'name', 'ASC']
                            ],
                            include: [
                                {
                                    model: sequelize.model('BusinessUnit'),
                                },
                                {
                                    model: sequelize.model('Facility'),
                                    include: [
                                        {
                                            model: sequelize.model('AssetLevelData'),
                                            required: false,
                                            include: [
                                                {
                                                    model: sequelize.model('BarrierType'),
                                                    required: false,
                                                    include: [
                                                        {
                                                            model: sequelize.model('Barrier'),
                                                            required: false
                                                        }
                                                    ]
                                                }
                                            ],
                                            where: {
                                                snapshot_date: results.dataValues.max_snapshot_date
                                            }
                                        },
                                        {
                                            model: sequelize.model('FacilityLevelData'),
                                            required: false,
                                        }
                                    ]
                                }
                            ]
                        }, {transaction: t}
                    ).then((assets: Array<AssetInstance>) => {
                        resolve(assets);
                    }).catch((error: Error) => {
                        reject(error);
                    });
                });


            });
        });

        return promise;
    }

    updateAssets(code: string, assetAttributes: AssetAttributes): Promise<number> {
        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].update(assetAttributes, {where: {id: code}})
                    .then((results: [number, Array<AssetInstance>]) => {
                        if (results.length > 0) {
                            //logger.info(`Updated product with name ${name}.`);
                        } else {
                            //logger.info(`Product with name ${name} does not exist.`);
                        }
                        resolve(results.length);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });
        return promise;
    }

    deleteAssets(code: string): Promise<void> {
        let promise = new Promise<void>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].destroy({where: {code: code}}).then((afffectedRows: number) => {
                    if (afffectedRows > 0) {
                        //logger.info(`Deleted product with name ${name}`);
                    } else {
                        //logger.info(`Product with name ${name} does not exist.`);
                    }
                    resolve(null);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }
}

export const assetService = new AssetService();
