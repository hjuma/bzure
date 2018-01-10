import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { UserAttributes, UserInstance } from './interfaces/user';
import * as crypto from 'crypto';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<UserInstance, UserAttributes> {
    let User = sequelize.define<UserInstance, UserAttributes>("User", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: dataTypes.DATE(),
            allowNull: false,
            primaryKey: false,
            defaultValue: dataTypes.NOW
        },
        business_unit_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        role_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        salt: {
            type: dataTypes.STRING(255)
        },
        last_login: {
            type: dataTypes.DATE
        },
        status: {
            type: dataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        updated_at: {
            type: dataTypes.DATE(),
            allowNull: true,
            defaultValue: null
        }

    }, {
            hooks: {
                beforeCreate: (user, options) => {
                    // generate the salt and hash the password before saving in the db
                    user.dataValues.salt = crypto.randomBytes(32).toString('hex');
                    user.dataValues.password = crypto.createHmac('sha1', user.dataValues.salt).update(user.dataValues.password).digest('hex');
                    //user.dataValues.salt = crypto.randomBytes(128).toString('hex');
                    //user.dataValues.password = crypto.pbkdf2Sync(user.dataValues.password, user.dataValues.salt, 10000, 512,'sha512').toString('hex');

                }
            },
            indexes: [{
                fields: ['username'],
                unique: true
            }],

            classMethods: {},
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'user'
        });

    User['associate'] = function (models) {
        User.belongsTo(models['Role'], { foreignKey: 'role_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        User.belongsTo(models['BusinessUnit'], { foreignKey: 'business_unit_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
    };

    return User;
}
