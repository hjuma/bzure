import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { AssetAttributes, AssetInstance } from './interfaces/asset';
import { models } from './index';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<AssetInstance, AssetAttributes> {

    let Asset = sequelize.define<AssetInstance, AssetAttributes>("Asset", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        business_unit_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(35),
            allowNull: false
        }
    }, {
            indexes: [
                {
                    fields: ['code'],
                    unique: true
                }],
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'asset'
        });

    Asset['associate'] = function (models) {
        Asset.belongsTo(models['BusinessUnit'], { foreignKey: 'business_unit_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Asset.hasMany(models['Facility'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Asset.hasMany(models['PlannerGroup'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Asset.hasMany(models['AbcIndicator'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Asset.hasMany(models['PerformanceStandard'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Asset.hasMany(models['PerformanceStandardMapping'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Asset.hasMany(models['BarrierType'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
    };

    return Asset;
}
