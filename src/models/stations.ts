import { db, DataTypes } from '../db/postgres'

export const Stations = db.define('stations', {
  station_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});