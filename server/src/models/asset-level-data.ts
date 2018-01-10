import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { AssetLevelDataAttributes, AssetLevelDataInstance } from './interfaces/asset-level-data';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<AssetLevelDataInstance, AssetLevelDataAttributes> {
    let AssetLevelData = sequelize.define<AssetLevelDataInstance, AssetLevelDataAttributes>("AssetLevelData", {
        snapshot_date: {
          type: dataTypes.DATE(),
          allowNull: false,
          primaryKey: true
        },
        facility_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        barrier_type_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        count_of_data: {
            type: dataTypes.INTEGER(21),
            allowNull: false
        },
        rag_status: {
            type: dataTypes.STRING(1),
            allowNull: true
        },
        red_count: {
            type: dataTypes.INTEGER(21),
            allowNull: false,
            defaultValue: 0
        },
        amber_count: {
            type: dataTypes.INTEGER(21),
            allowNull: false,
            defaultValue: 0
        },
        green_count: {
            type: dataTypes.INTEGER(21),
            allowNull: false,
            defaultValue: 0
        }
    }, {
        indexes: [{
            fields: ['snapshot_date'],
            unique: false}
        ],
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'asset_level_data'
    });

    AssetLevelData['associate'] = function(models) {
        AssetLevelData.belongsTo(models['Facility'], {foreignKey: 'facility_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        AssetLevelData.belongsTo(models['BarrierType'], {foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return AssetLevelData;
}