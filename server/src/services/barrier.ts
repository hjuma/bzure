//import {logger} from "../utils/logger";
import { models, sequelize } from '../models/index';
import { BarrierAttributes, BarrierInstance } from '../models/interfaces/barrier';
import { Sequelize, SequelizeStatic, Transaction } from 'sequelize';
import { FacilityInstance } from '../models/interfaces/facility';
import { BarrierElementInstance } from "../models/interfaces/barrier-element";

export class BarrierService {

    retrieveBarriers(asset_id): Promise<Array<BarrierInstance>> {
        let promise = new Promise<Array<BarrierInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Barrier'].findAll(
                    {
                        where: {
                            id: { $ne: -1 }
                        },
                        include: [
                            {
                                model: sequelize.model('BarrierType'),
                                where: {
                                    asset_id: asset_id
                                }
                            }
                        ],
                        order: [
                            ['display_order', 'ASC'],
                            [sequelize.model('BarrierType'), 'display_order', 'ASC']
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
    retrieveAllBarriers(asset_id:string): Promise<Array<BarrierInstance>> {
        let promise = new Promise<Array<BarrierInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Barrier'].findAll(
                    {
                        where: {
                        },
                        include: [
                            {
                                model: sequelize.model('BarrierType'),
                                where: {
                                    asset_id: asset_id
                                }
                            }
                        ],
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

    

    updateBarrier(code: string, barrierAttributes: BarrierAttributes): Promise<number> {
        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['Barrier'].update(barrierAttributes, { where: { id: code } })
                    .then((results: [number, Array<BarrierInstance>]) => {
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

    

    retrieveBarrierElements(): Promise<Array<BarrierElementInstance>> {
        let promise = new Promise<Array<BarrierElementInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierElement'].findAll(
                    {
                        include: [
                            {
                                model: sequelize.model('BarrierMetric'),
                                where: {
                                    id: { $ne: -1 }
                                }
                            }
                        ],
                        order: [
                            ['id','ASC'],
                            [sequelize.model('BarrierMetric'), 'display_order', 'ASC']
                        ]
                    }
                ).then((barrierElements: Array<BarrierElementInstance>) => {
                    resolve(barrierElements);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    retrieveAllBarrierElements(): Promise<Array<BarrierElementInstance>> {
        let promise = new Promise<Array<BarrierElementInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['BarrierElement'].findAll(
                    {
                        include: [
                            {
                                model: sequelize.model('BarrierMetric'),
                                where: {
                                },
                                order: ['display_order', 'ASC']
                            }
                        ]
                    }
                ).then((barrierElements: Array<BarrierElementInstance>) => {
                    resolve(barrierElements);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }
}

export const barrierService = new BarrierService();
