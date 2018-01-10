import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { BarrierElementFieldAttributes, BarrierElementFieldInstance } from './interfaces/barrier-element-field';
import { models } from './index';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<BarrierElementFieldInstance, BarrierElementFieldAttributes> {

    let BarrierElementField = sequelize.define<BarrierElementFieldInstance, BarrierElementFieldAttributes>("BarrierElementField", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        barrier_element_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        field_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        display_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        display_order: {
            type: dataTypes.INTEGER(),
            allowNull: false
        }
    }, {
        indexes: [],
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'barrier_element_field'
    });

    BarrierElementField['associate'] = function(models) {
        BarrierElementField.belongsTo(models['BarrierElement'], {foreignKey: 'barrier_element_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return BarrierElementField;
}
