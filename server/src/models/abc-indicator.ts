import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { AbcIndicatorAttributes, AbcIndicatorInstance } from './interfaces/abc-indicator';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<AbcIndicatorInstance, AbcIndicatorAttributes> {
    let AbcIndicator = sequelize.define<AbcIndicatorInstance, AbcIndicatorAttributes>("AbcIndicator", {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: dataTypes.STRING(3),
            allowNull: false,
            primaryKey: false
        },
        asset_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: false
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
            tableName: 'abc_indicator'
        });

    AbcIndicator['associate'] = function (models) {
        AbcIndicator.belongsTo(models['Asset'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        AbcIndicator.hasMany(models['WorkOrderLevelData'], { foreignKey: 'abc_indicator_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
    };

    return AbcIndicator;
}
