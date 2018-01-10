import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { BarrierTypeAttributes, BarrierTypeInstance } from './interfaces/barrier-type';
import { models } from './index';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<BarrierTypeInstance, BarrierTypeAttributes> {

    let BarrierType = sequelize.define<BarrierTypeInstance, BarrierTypeAttributes>("BarrierType", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        asset_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        barrier_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        },
        display_order: {
            type: dataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
            indexes: [],
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'barrier_type'
        });

    BarrierType['associate'] = function (models) {
        BarrierType.belongsTo(models['Barrier'], { foreignKey: 'barrier_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        BarrierType.belongsTo(models['Asset'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        BarrierType.hasMany(models['FacilityLevelData'], { foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        BarrierType.hasMany(models['AssetLevelData'], { foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        BarrierType.hasMany(models['WorkOrderLevelData'], { foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
    };

    return BarrierType;
}
