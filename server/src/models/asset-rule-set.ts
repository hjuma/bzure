import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { AssetRuleSetAttributes, AssetRuleSetInstance } from './interfaces/asset-rule-set';

export default function(sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<AssetRuleSetInstance, AssetRuleSetAttributes> {
    let AssetRuleSet = sequelize.define<AssetRuleSetInstance, AssetRuleSetAttributes>("AssetRuleSet", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        start_dt: {
            type: dataTypes.DATE(),
            allowNull: false,
            primaryKey: false,
            defaultValue: dataTypes.NOW
        }, 
        current_flag: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            primaryKey: false,
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
                fields: ['barrier_id', 'start_dt', 'current_flag'],
                unique: true
            }
        ],
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'asset_rule_set'
    });

    AssetRuleSet['associate'] = function(models) {
        AssetRuleSet.belongsTo(models['Barrier'], {foreignKey: 'barrier_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION'});
    };

    return AssetRuleSet;
}