import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { RoleAttributes, RoleInstance } from './interfaces/role';
import { models } from './index';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<RoleInstance, RoleAttributes> {

    let Role = sequelize.define<RoleInstance, RoleAttributes>("Role", {
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
        name: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE(),
            allowNull: true,
            defaultValue: null
        }
    }, {
        indexes: [],
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'role'
    });

    Role['associate'] = function(models) {
        Role.hasMany(models['User'], {foreignKey: 'role_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return Role;
}
