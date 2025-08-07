import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface TelemetryAttributes {
  id?: number;
  vehicleId: string;
  timestamp: Date;
  fuelLevel: number;
  engineTemp: number;
  gpsLat: number;
  gpsLng: number;
}

interface TelemetryCreationAttributes
  extends Optional<TelemetryAttributes, 'id'> {}

class Telemetry
  extends Model<TelemetryAttributes, TelemetryCreationAttributes>
  implements TelemetryAttributes
{
  public id!: number;
  public vehicleId!: string;
  public timestamp!: Date;
  public fuelLevel!: number;
  public engineTemp!: number;
  public gpsLat!: number;
  public gpsLng!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Telemetry.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      vehicleId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fuelLevel: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      engineTemp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      gpsLat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      gpsLng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'telemetry',
    }
  );

  return Telemetry;
};

export { Telemetry };
