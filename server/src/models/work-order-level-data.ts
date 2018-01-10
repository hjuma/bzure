import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { WorkOrderLevelDataAttributes, WorkOrderLevelDataInstance } from './interfaces/work-order-level-data';
import { models } from './index';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<WorkOrderLevelDataInstance, WorkOrderLevelDataAttributes> {

    let WorkOrderLevelData = sequelize.define<WorkOrderLevelDataInstance, WorkOrderLevelDataAttributes>("WorkOrderLevelData", {
        snapshot_date: {
            type: dataTypes.DATE(),
            allowNull: false,
            primaryKey: true
        },
        work_order_number: {
            type: dataTypes.STRING(50),
            primaryKey: true
        },
        facility_id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true
        },
        functional_location: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        barrier_element_id: {
            type: dataTypes.INTEGER(10)
        },
		barrier_type_id: {
            type: dataTypes.INTEGER(10)
        },
		barrier_metric_id: {
            type: dataTypes.INTEGER(10)
        },
		rag_status: {
            type: dataTypes.STRING(1)
        },
		planner_group_id: {
            type: dataTypes.INTEGER(10)
        },
		abc_indicator_id: {
            type: dataTypes.INTEGER(10)
        },
		work_order_description: {
            type: dataTypes.STRING(50)
        },
		order_type: {
            type: dataTypes.STRING(50)
        },
		user_status: {
            type: dataTypes.STRING(50)
        },
		awaiting_deferment: {
            type: dataTypes.STRING(1)
        },
		deferred: {
            type: dataTypes.STRING(1)
        },
		work_centre: {
            type: dataTypes.STRING(50)
        },
		latest_allowable_finish_date: {
            type: dataTypes.DATE
        },
        maint_activ_type: {
            type: dataTypes.STRING(50),
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
        tableName: 'work_order_level_data'
    });

    WorkOrderLevelData['associate'] = function(models) {
        WorkOrderLevelData.belongsTo(models['PlannerGroup'], { foreignKey: 'planner_group_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        WorkOrderLevelData.belongsTo(models['AbcIndicator'], { foreignKey: 'abc_indicator_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        WorkOrderLevelData.belongsTo(models['Facility'], { foreignKey: 'facility_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        WorkOrderLevelData.belongsTo(models['BarrierElement'], { foreignKey: 'barrier_element_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        WorkOrderLevelData.belongsTo(models['BarrierType'], { foreignKey: 'barrier_type_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        WorkOrderLevelData.belongsTo(models['BarrierMetric'], { foreignKey: 'barrier_metric_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return WorkOrderLevelData;
}
