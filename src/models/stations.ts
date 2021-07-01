import { db, DataTypes } from '../db/postgres'

export const Stations = db.define('station', {
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    captureTime: {
      type: DataTypes.STRING
    }
  });