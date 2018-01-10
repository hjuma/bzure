import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { FacilityRuleSetAttributes, FacilityRuleSetInstance } from './interfaces/facility-rule-set';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<FacilityRuleSetInstance, FacilityRuleSetAttributes> {
    let FacilityRuleSet = sequelize.define<FacilityRuleSetInstance, FacilityRuleSetAttributes>("FacilityRuleSet", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        start_dt: {
            type: dataTypes.DATE(),
            allowNull: false,
            primaryKey: true,
            defaultValue: dataTypes.NOW
        }, 
        current_flag: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            primaryKey: true,
            defaultValue: true
        },
        version_no: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        barrier_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: false
        },
        barrier_metric_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: false
        },
        amber_start: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        amber_end: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        updated_by: {
            type: dataTypes.STRING(35),
            allowNull: false
        },
        update_comment: {
        type: dataTypes.STRING(200),
            allowNull: true,
            defaultValue: 'Initial system load'
        },
        end_dt: {
            type: dataTypes.DATE(),
            allowNull: true,
            defaultValue: null
        }  
    }, {
        indexes: [
            {
                fields: ['barrier_id', 'barrier_metric_id', 'start_dt', 'current_flag'],
                name: 'uk_facility_rule_set',
                unique: true
            }
        ],
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'facility_rule_set'
    });

    FacilityRuleSet['associate'] = function(models) {
        FacilityRuleSet.belongsTo(models['Barrier'], {foreignKey: 'barrier_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
        FacilityRuleSet.belongsTo(models['BarrierMetric'], {foreignKey: 'barrier_metric_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return FacilityRuleSet;
}