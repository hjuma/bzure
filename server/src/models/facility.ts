import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { FacilityAttributes, FacilityInstance } from './interfaces/facility';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<FacilityInstance, FacilityAttributes> {
    let Facility = sequelize.define<FacilityInstance, FacilityAttributes>("Facility", {
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
        name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(25),
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
            tableName: 'facility'
        });

    Facility['associate'] = function (models) {
        Facility.belongsTo(models['Asset'], { foreignKey: 'asset_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Facility.hasMany(models['FacilityLevelData'], { foreignKey: 'facility_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Facility.hasMany(models['AssetLevelData'], { foreignKey: 'facility_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });
        Facility.hasMany(models['WorkOrderLevelData'], { foreignKey: 'facility_id', onUpdate: 'NO ACTION', onDelete: 'NO ACTION' });

    };

    return Facility;
}