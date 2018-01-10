//import {logger} from "../utils/logger";
import { models, sequelize } from '../models/index';
import { BarrierAttributes, BarrierInstance } from '../models/interfaces/barrier';
import { BusinessUnitAttributes, BusinessUnitInstance } from "../models/interfaces/business-unit";
import { BarrierElementAttributes, BarrierElementInstance } from '../models/interfaces/barrier-element';
import { AssetInstance, AssetAttributes } from '../models/interfaces/asset';
import { FacilityAttributes, FacilityInstance } from '../models/interfaces/facility';
import { BarrierTypeAttributes, BarrierTypeInstance } from '../models/interfaces/barrier-type';
import { Sequelize, SequelizeStatic, Transaction } from 'sequelize';

export class ReferenceDataService {

    getAllBarriers(): Promise<Array<BarrierInstance>> {
        let promise = new Promise<Array<BarrierInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Barrier'].findAll(
                    {
                        order: [
                            ['display_order', 'ASC']
                        ]
                    }
                ).then((barriers: Array<BarrierInstance>) => {
                    resolve(barriers);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    updateBarrier(code: string, barrierAttributes: BarrierAttributes): Promise<BarrierInstance> {
        let promise = new Promise<BarrierInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Barrier'].update(barrierAttributes, { where: { id: code } })
                    .then((barrier: BarrierInstance) => {
                        //logger.info(`Created product with name ${productAttributes.name}.`);
                        resolve(barrier);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });

        return promise;
    }


    createBarrier(barrierAttributes: BarrierAttributes): Promise<BarrierInstance> {
        let promise = new Promise<BarrierInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Barrier'].create(barrierAttributes).then((barrier: BarrierInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(barrier);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

    updateAsset(code: string, assetAttributes: AssetAttributes): Promise<AssetInstance> {
        let promise = new Promise<AssetInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].update(assetAttributes, { where: { id: code } })
                    .then((asset: AssetInstance) => {
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

    createAsset(assetAttributes: AssetAttributes): Promise<BarrierElementInstance> {
        let promise = new Promise<BarrierElementInstance>((resolve: Function, reject: Function) => {
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

    getAllAssets(): Promise<Array<AssetInstance>> {
        let promise = new Promise<Array<AssetInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Asset'].findAll(
                    {
                        include: [
                            {
                                model: sequelize.model('BusinessUnit'), required: false
                            }
                        ]
                    }
                ).then((assets: Array<AssetInstance>) => {
                    resolve(assets);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    updateFacility(code: string, facilityAttributes: FacilityAttributes): Promise<FacilityInstance> {
        let promise = new Promise<FacilityInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Facility'].update(facilityAttributes, { where: { id: code } })
                    .then((facility: FacilityInstance) => {
                        //logger.info(`Created product with name ${productAttributes.name}.`);
                        resolve(facility);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });
        return promise;
    }

    createFacility(facilityAttributes: FacilityAttributes): Promise<FacilityInstance> {
        let promise = new Promise<FacilityInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Facility'].create(facilityAttributes).then((facility: FacilityInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(facility);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

    getAllFacilities(): Promise<Array<FacilityInstance>> {
        let promise = new Promise<Array<FacilityInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Facility'].findAll({
                    include: [
                        {
                            model: sequelize.model('Asset'), required: false
                        }
                    ]
                }).then((facilities: Array<FacilityInstance>) => {
                    //logger.info("Retrieved all products.");
                    resolve(facilities);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });
        return promise;
    }

    updateBarrierElement(code: string, barrierElementAttributes: BarrierElementAttributes): Promise<BarrierElementInstance> {
        let promise = new Promise<BarrierElementInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierElement'].update(barrierElementAttributes, { where: { id: code } })
                    .then((barrierElement: BarrierElementInstance) => {
                        //logger.info(`Created product with name ${productAttributes.name}.`);
                        resolve(barrierElement);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });
        return promise;
    }

    createBarrierElement(barrierElementAttributes: BarrierElementAttributes): Promise<BarrierElementInstance> {
        let promise = new Promise<BarrierElementInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierElement'].create(barrierElementAttributes).then((barrierElement: BarrierElementInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(barrierElement);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });
        return promise;
    }

    getAllBarrierElements(): Promise<Array<BarrierElementInstance>> {
        let promise = new Promise<Array<BarrierElementInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierElement'].findAll().then((barrierElements: Array<BarrierElementInstance>) => {
                    resolve(barrierElements);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }

    createBusinessUnit(BusinessUnitAttributes: BusinessUnitAttributes): Promise<BusinessUnitInstance> {
        let promise = new Promise<BusinessUnitInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BusinessUnit'].create(BusinessUnitAttributes).then((businessUnit: BusinessUnitInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(businessUnit);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });
        return promise;
    }


    retrieveBusinessUnits(): Promise<Array<BusinessUnitInstance>> {
        let promise = new Promise<Array<BusinessUnitInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BusinessUnit'].findAll().then((businessUnits: Array<BusinessUnitInstance>) => {
                    resolve(businessUnits);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }

    updateBusinessUnit(id: string, businessUnitAttributes: BusinessUnitAttributes): Promise<BusinessUnitInstance> {
        let promise = new Promise<BusinessUnitInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BusinessUnit'].update(businessUnitAttributes, { where: { id: id } })
                    .then((businessUnit: BusinessUnitInstance) => {
                        //logger.info(`Created product with name ${productAttributes.name}.`);
                        resolve(businessUnit);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });
        return promise;
    }

    createBarrierType(barrierTypeAttributes: BarrierTypeAttributes): Promise<BarrierTypeInstance> {
        let promise = new Promise<BarrierTypeInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierType'].create(barrierTypeAttributes).then((barrierType: BarrierTypeInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(barrierType);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });
        return promise;
    }

    retrieveBarrierTypes(): Promise<Array<BarrierTypeInstance>> {
        let promise = new Promise<Array<BarrierTypeInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierType'].findAll(
                    {
                        order: [
                            ['display_order', 'ASC']
                        ],
                        include: [
                            {
                                model: sequelize.model('Asset')
                            },
                            {
                                model: sequelize.model('Barrier')
                            }
                        ]
                    }
                ).then((barrierTypes: Array<BarrierTypeInstance>) => {
                    resolve(barrierTypes);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }

    updateBarrierType(id: string, barrierTypeAttributes: BarrierTypeAttributes): Promise<BarrierTypeInstance> {
        let promise = new Promise<BarrierTypeInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierType'].update(barrierTypeAttributes, { where: { id: id } })
                    .then((barrierType: BarrierTypeInstance) => {
                        //logger.info(`Created product with name ${productAttributes.name}.`);
                        resolve(barrierType);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });
        return promise;
    }


    checkApplicationDataExistence(): Promise<any> {
        return new Promise<any>((resolve: Function, reject: Function) => {
            sequelize.query('select * from vw_reference_data_count', { type: sequelize.QueryTypes.SELECT }).then(results => {
                resolve(results);
            }, err => {
                reject({ error: true });
            })
        });
    }
}

export const referenceDataService = new ReferenceDataService();
