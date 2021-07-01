import { db, DataTypes } from '../db/postgres'

export const Weather = db.define('weather', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    }
  }, {
  });