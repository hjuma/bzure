import * as jwt from 'jsonwebtoken';
import { models, sequelize } from '../models/index';
import { Sequelize, SequelizeStatic, Transaction } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { UserAttributes, UserInstance } from '../models/interfaces/user';
import { isNullOrUndefined } from "util";
import * as crypto from 'crypto';
import * as constants from 'constants';

export class AuthenticationService {

    public async login(username: string, encryptedPassword: string) {
        const response = {};
        let password = this.decryptPassword(encryptedPassword);
        let promise = new Promise(function (resolve, reject) {
            sequelize.transaction((t: Transaction) => {
                return models['User'].findOne(
                    {
                        where: { username: username },
                        include: [
                            {
                                model: sequelize.model('Role')
                            },
                            {
                                model: sequelize.model('BusinessUnit')
                            }
                        ]
                    }).then((user: UserInstance) => {
                        if (user) {
                            const hashedPasswd = crypto.createHmac('sha1', user.dataValues.salt).update(password).digest('hex')
                            //const encryptedPasswd = crypto.pbkdf2Sync(user.dataValues.password, user.dataValues.salt, 10000, 512,'sha512').toString('hex');
                            if (user.dataValues.password !== hashedPasswd) {
                                response['err'] = 'Username or Password does not match!!!';
                                response['code'] = 403;
                                response['data'] = undefined;
                            }
                            else {
                                const createdAt = new Date().getTime();
                                var cert = fs.readFileSync(path.join(__dirname, '../', 'config', 'key', 'jwtRS256.key'));
                                const userToken = {
                                    id: user['id'],
                                    username: user['username'],
                                    status: user['status'],
                                    role: user['Role'],
                                    createdAt: createdAt,
                                    first_name: user['first_name'],
                                    last_name: user['last_name'],
                                    business_unit: user['BusinessUnit']
                                };
                                const token = jwt.sign(userToken, cert, { algorithm: 'RS256' });
                                response['err'] = undefined;
                                response['code'] = 200;
                                response['data'] = {
                                    user: userToken,
                                    auth: {
                                        token: token
                                    }
                                }
                            }
                            user.dataValues.last_login = new Date();
                            models['User'].update({ 'last_login': user.dataValues.last_login }, { where: { username: user.dataValues.username } })
                                .then(() => {
                                    resolve(null);
                                }).catch((error: Error) => {
                                    console.log('Error -----------> ', error);
                                });
                        } else {
                            response['code'] = 403;
                            response['err'] = `Unable to login ${username}, please check username and password`;
                            response['data'] = undefined;
                        }
                        resolve(response);
                    }).catch((error: Error) => {
                        reject(error);
                    });
            });

        });

        return promise;
    }

    private decryptPassword(encryptedPassword: string) {
        var options = {
            key: null,
            padding: null
        }
        var privateKey = fs.readFileSync(path.join(__dirname, '../', 'config', 'key', 'pwd_1024_priv.pem'));
        var buffer = new Buffer(encryptedPassword, "base64");
        options.key = privateKey;
        options.padding = constants.RSA_PKCS1_PADDING;
        var decrypted = crypto.privateDecrypt(options, buffer);
        return decrypted.toString("utf8");
    };


    public getPublicKeys() {
        const response = {};
        let filePath = path.join(path.join(__dirname, '../', 'config', 'key', 'pwd_1024_pub.pem'));
        let promise = new Promise(function (resolve, reject) {
            var publicKey = fs.readFileSync(filePath, 'UTF-8');
            response['public_key'] = publicKey;
            resolve(response);
        });
        return promise;
    };

    public verifyToken(token: string) {
        const response = {};
        let promise = new Promise(function (resolve, reject) {
            if (!token) {
                response['err'] = 'InvalidToken';
                response['code'] = 403;
                response['data'] = undefined;
            } else {
                var cert = fs.readFileSync(path.join(__dirname, '../','config', 'key', 'jwtRS256.key.pub'));
                jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
                    if (err) {
                        response['err'] = 'InvalidToken';
                        response['code'] = 403;
                        response['data'] = undefined;
                    } else {
                        response['err'] = undefined;
                        response['code'] = 200;
                        response['data'] = payload;
                    }
                });
            }
            resolve(response);
        });
        return promise;
    }

}

export const authenticationService = new AuthenticationService();