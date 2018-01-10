import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { FacilityLevelDataAttributes, FacilityLevelDataInstance } from './interfaces/facility-level-data';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<FacilityLevelDataInstance, FacilityLevelDataAttributes> {
    let FacilityLevelData = sequelize.define<FacilityLevelDataInstance, FacilityLevelDataAttributes>("FacilityLevelData", {
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
        barrier_metric_id: {
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
        }
    }, {
        indexes: [{
            fields: ['snapshot_date'],
            unique: false}
        ],
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'facility_level_data'
    });

    FacilityLevelData['associate'] = function(models) {
        FacilityLevelData.belongsTo(models['Facility'], {foreignKey: 'facility_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        FacilityLevelData.belongsTo(models['BarrierType'], {foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        FacilityLevelData.belongsTo(models['BarrierMetric'], {foreignKey: 'barrier_metric_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return FacilityLevelData;
}