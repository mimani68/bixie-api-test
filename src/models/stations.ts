import { db, DataTypes } from '../db/postgres'

export const Stations = db.define('station', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    }
  }, {
  });