import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { PerformanceStandardMappingAttributes, PerformanceStandardMappingInstance } from './interfaces/performance-standard-mapping';
import { models } from './index';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<PerformanceStandardMappingInstance, PerformanceStandardMappingAttributes> {

    let PerformanceStandardMapping = sequelize.define<PerformanceStandardMappingInstance, PerformanceStandardMappingAttributes>("PerformanceStandardMapping", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(50),
            allowNull: false,
            primaryKey: false
        },
        asset_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: false
        },
        ps_id: {
            type: dataTypes.INTEGER(10),
            allowNull: true,
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['code', 'asset_id'],
                unique: true
            }
        ],
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'performance_standard_mapping'
    });

    PerformanceStandardMapping['associate'] = function(models) {
        PerformanceStandardMapping.belongsTo(models['Asset'], {foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return PerformanceStandardMapping;
}
