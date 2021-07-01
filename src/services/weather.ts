import { and } from 'sequelize'

import { Weather } from '../models'
import { config } from '../config'
import { error } from '../utils/log'
import { weatherApi } from '../utils/weather_api'

export class WeatherService {

  static async getLatestWeatherInfo( citySymbol: string, time?: string ) {
    if ( !time )
      time = new Date(2001, 1, 1).toISOString()
    return await Weather.findAll({
      where: and(
        { city: citySymbol },
        { captureTime: { gte: time } },
        { captureTime: { lte: new Date().toISOString() } }
      ),
      offset: config.PAGE_OFFSET,
      limit: config.PAGE_LIMIT
    })
  }

  static async updateWeatherInfo( citySymbol: string ) {
    let value = await weatherApi( citySymbol )
    if ( !value.success )
      return null
    return await Weather.create({
      data: JSON.stringify(value),
      city: citySymbol, 
      captureTime: new Date().toISOString()
    })
      .then(_ => true)
      .catch( err => {
        error(err)
        return false
      })
  }

}