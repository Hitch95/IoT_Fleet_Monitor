import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class Telemetry extends Model<
  InferAttributes<Telemetry, { omit: 'createdAt' | 'updatedAt' }>,
  InferCreationAttributes<Telemetry, { omit: 'createdAt' | 'updatedAt' }>
> {
  declare id: CreationOptional<number>;
  declare vehicleId: string;
  declare timestamp: Date;
  declare fuelLevel: number;
  declare engineTemp: number;
  declare gpsLat: number;
  declare gpsLng: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const initTelemetry = (sequelize: Sequelize) => {
  Telemetry.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      timestamps: true,
    }
  );
};

export { Telemetry, initTelemetry };
