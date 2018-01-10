import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { PerformanceStandardAttributes, PerformanceStandardInstance } from './interfaces/performance-standard';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<PerformanceStandardInstance, PerformanceStandardAttributes> {
    let PerformanceStandard = sequelize.define<PerformanceStandardInstance, PerformanceStandardAttributes>("PerformanceStandard", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(10),
            allowNull: false,
            primaryKey: false
        },
        asset_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: false
        },
        barrier_type_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
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
        classMethods: {},
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'performance_standard'
    });

    PerformanceStandard['associate'] = function(models) {
        PerformanceStandard.belongsTo(models['Asset'], {foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        PerformanceStandard.belongsTo(models['BarrierType'], {foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        PerformanceStandard.hasMany(models['PerformanceStandardMapping'], {foreignKey: 'ps_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return PerformanceStandard;
}
