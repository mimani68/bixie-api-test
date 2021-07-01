import { db, DataTypes } from '../db/postgres'

export const Stations = db.define('station', {
  id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  captureTime: {
    type: DataTypes.STRING
  }
});