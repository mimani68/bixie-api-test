import { Sequelize } from 'sequelize'
export { DataTypes } from 'sequelize'
import { config } from '../config'

export const db = new Sequelize(`${ config.DB_CONNECTION_URL }`)