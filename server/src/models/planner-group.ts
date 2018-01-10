import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { PlannerGroupAttributes, PlannerGroupInstance } from './interfaces/planner-group';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<PlannerGroupInstance, PlannerGroupAttributes> {
    let PlannerGroup = sequelize.define<PlannerGroupInstance, PlannerGroupAttributes>("PlannerGroup", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(3),
            allowNull: false
        },
        asset_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: false
        },
        description: {
            type: dataTypes.STRING(40),
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
            tableName: 'planner_group'
        });

    PlannerGroup['associate'] = function (models) {
        PlannerGroup.belongsTo(models['Asset'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        PlannerGroup.hasMany(models['WorkOrderLevelData'], { foreignKey: 'planner_group_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
    };

    return PlannerGroup;
}
