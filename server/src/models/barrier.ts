import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { BarrierAttributes, BarrierInstance } from './interfaces/barrier';
import { models } from './index';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<BarrierInstance, BarrierAttributes> {

    let Barrier = sequelize.define<BarrierInstance, BarrierAttributes>("Barrier", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        display_order: {
            type: dataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
            indexes: [{
                fields: ['code'],
                unique: true
            }],
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'barrier'
        });

    Barrier['associate'] = function (models) {
        Barrier.hasMany(models['BarrierType'], { foreignKey: 'barrier_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Barrier.hasMany(models['FacilityRuleSet'], { foreignKey: 'barrier_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Barrier.hasMany(models['AssetRuleSet'], { foreignKey: 'barrier_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
    };

    return Barrier;
}
