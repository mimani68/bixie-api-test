import { db, DataTypes } from '../db/postgres'

export const Weather = db.define('weather', {
  data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  captureTime: {
    type: DataTypes.STRING
  }
});