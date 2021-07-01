import { db, DataTypes } from '../db/postgres'

export const Weather = db.define('weathers', {
  data: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
});