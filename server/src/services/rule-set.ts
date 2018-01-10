//import {logger} from "../utils/logger";
import { models, sequelize } from '../models/index';
import {AssetRuleSetAttributes, AssetRuleSetInstance} from '../models/interfaces/asset-rule-set';
import { Sequelize, SequelizeStatic, Transaction } from 'sequelize';
import { FacilityRuleSetInstance } from '../models/interfaces/facility-rule-set';
import {AssetAttributes} from "../models/interfaces/asset";

export class RuleSetService {

    retrieveAssetRuleset(): Promise<Array<AssetRuleSetInstance>> {
        let promise = new Promise<Array<AssetRuleSetInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['AssetRuleSet'].findAll(
                    {
                        where: {
                          current_flag: 1
                        },
                        include: [
                            {
                                model: sequelize.model('Barrier')
                            }
                        ],
                        order: [
                            [sequelize.model('Barrier'),'display_order', 'ASC']
                        ],

                    }
                ).then((assetRuleSet: Array<AssetRuleSetInstance>) => {
                    resolve(assetRuleSet);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    retrieveAssetRulesetHistory(barrier_id: number): Promise<Array<AssetRuleSetInstance>> {
        let promise = new Promise<Array<AssetRuleSetInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['AssetRuleSet'].findAll(
                    {
                        where: {
                            barrier_id: barrier_id
                        },
                        order: [
                          ['end_dt', 'DESC']
                        ],
                        include: [
                            {
                                model: sequelize.model('Barrier')
                            }
                        ],

                    }
                ).then((assetRuleSet: Array<AssetRuleSetInstance>) => {
                    resolve(assetRuleSet);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    updateAssetRuleSet(ruleSet: any): Promise<void>{
        let promise = new Promise<void>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {

                return models['AssetRuleSet'].update({
                    current_flag: 0,
                    end_dt: Date.now()
                }, { where: { id: ruleSet['id']}, transaction: t})
                    .then((results: [number, Array<AssetRuleSetInstance>]) => {
                        return models['AssetRuleSet'].create(
                            {
                                barrier_id: ruleSet['barrier_id'],
                                amber_start: ruleSet['amber_start'],
                                amber_end: ruleSet['amber_end'],
                                version_no: ruleSet['version_no'] + 1,
                                current_flag: 1,
                                updated_by: ruleSet['updated_by'],
                                update_comment: ruleSet['update_comment'],
                                start_dt: Date.now()
                        }, { transaction: t});


                    });
            }).then(result=> {
                resolve(null);
            }).catch((error: Error) => {
                reject(error);
            });
        });

        return promise;
    }


    retrievefacilityRuleset(): Promise<Array<FacilityRuleSetInstance>> {
        let promise = new Promise<Array<FacilityRuleSetInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['FacilityRuleSet'].findAll(
                    {
                        where: {
                            current_flag: 1
                        },
                        include: [
                            {
                                model: sequelize.model('Barrier')
                            },
                            {
                                model: sequelize.model('BarrierMetric'),
                                include: [
                                    {
                                        model: sequelize.model('BarrierElement')

                                    }
                                ]
                            }
                        ],
                        order: [
                        [sequelize.model('Barrier'),'display_order', 'ASC'],
                            [sequelize.model('BarrierMetric'),'display_order', 'ASC']
                    ]

                    }
                ).then((facilityRuleSet: Array<FacilityRuleSetInstance>) => {
                    resolve(facilityRuleSet);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }


    retrieveFacilityRulesetHistory(barrier_id: number, barrier_metric_id: number): Promise<Array<FacilityRuleSetInstance>> {
        let promise = new Promise<Array<FacilityRuleSetInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['FacilityRuleSet'].findAll(
                    {
                        where: {
                            barrier_id: barrier_id,
                            barrier_metric_id: barrier_metric_id
                        },
                        include: [
                            {
                                model: sequelize.model('Barrier')
                            },
                            {
                                model: sequelize.model('BarrierMetric'),
                                include: [
                                    {
                                        model: sequelize.model('BarrierElement')

                                    }
                                ]
                            }
                        ],
                        order: [
                            ['end_dt', 'DESC']
                        ]

                    }
                ).then((facilityRuleSet: Array<FacilityRuleSetInstance>) => {
                    resolve(facilityRuleSet);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    updateFacilityRuleSet(ruleSet: any): Promise<void>{
        let promise = new Promise<void>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {

                return models['FacilityRuleSet'].update(
                    {
                        end_dt: Date.now(),
                        current_flag: 0
                    },
                    { where: { id: ruleSet['id']}, transaction: t})
                    .then((results: [number, Array<FacilityRuleSetInstance>]) => {
                        return  models['FacilityRuleSet'].create({
                            barrier_id: ruleSet['barrier_id'],
                            barrier_metric_id: ruleSet['barrier_metric_id'],
                            amber_start: ruleSet['amber_start'],
                            amber_end: ruleSet['amber_end'],
                            version_no: ruleSet['version_no'] + 1,
                            updated_by: ruleSet['updated_by'],
                            update_comment: ruleSet['update_comment'],
                            start_dt: Date.now(),
                            current_flag: 1
                        }, { transaction: t});
                    });

            }).then(results => {
                resolve(null);
            }).error((error: Error) => {
                reject(error);
            });
        });

        return promise;
    }


}

export const ruleSetService = new RuleSetService();
