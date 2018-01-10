//import {logger} from "../utils/logger";
import { models, sequelize } from '../models/index';
import { UserAttributes, UserInstance } from '../models/interfaces/user';
import { Sequelize, SequelizeStatic, Transaction } from 'sequelize';

export class UserService {
    createUser(userAttributes: UserAttributes): Promise<UserInstance> {
        let promise = new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['User'].create(userAttributes).then((user: UserInstance) => {
                    //logger.info(`Created product with name ${productAttributes.name}.`);
                    resolve(user);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

    retrieveUser(id: string): Promise<UserInstance> {
        let promise = new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['User'].findOne({ where: { id: id } }).then((user: UserInstance) => {
                    if (user) {
                        //logger.info(`Retrieved product with name ${name}.`);
                    } else {
                        //logger.info(`Product with name ${name} does not exist.`);
                    }
                    resolve(user);
                }).catch((error: Error) => {
                    //logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

    retrieveUsers(): Promise<Array<UserInstance>> {
        let promise = new Promise<Array<UserInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['User'].findAll(
                    {
                        attributes: { exclude: ['salt', 'password']},
                        include: [
                            {
                                model: sequelize.model('BusinessUnit')
                            },
                            {
                                model: sequelize.model('Role'),
                            }
                        ]
                    }
                ).then((users: Array<UserInstance>) => {
                    resolve(users);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        });

        return promise;
    }

    updateUser(id: string, userAttributes: any): Promise<UserInstance> {
        let promise = new Promise<UserInstance>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models['User'].update(userAttributes, { where: { id: id } })
                    .then((user:UserInstance) => {
                        if (user) {
                            //logger.info(`Updated product with name ${name}.`);
                        } else {
                            //logger.info(`Product with name ${name} does not exist.`);
                        }
                        resolve(user);
                    }).catch((error: Error) => {
                        //logger.error(error.message);
                        reject(error);
                    });
            });
        });
        return promise;
    }

}

export const userService = new UserService();
