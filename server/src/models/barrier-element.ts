import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { BarrierElementAttributes, BarrierElementInstance } from './interfaces/barrier-element';
import { models } from './index';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<BarrierElementInstance, BarrierElementAttributes> {

    let BarrierElement = sequelize.define<BarrierElementInstance, BarrierElementAttributes>("BarrierElement", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }, {
            indexes: [],
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'barrier_element'
        });

    BarrierElement['associate'] = function(models) {
        BarrierElement.hasMany(models['BarrierMetric'], {foreignKey: 'barrier_element_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        BarrierElement.hasMany(models['WorkOrderLevelData'], {foreignKey: 'barrier_element_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        BarrierElement.hasMany(models['BarrierElementField'], {foreignKey: 'barrier_element_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return BarrierElement;
}
