import axois, { Method } from 'axios'

import { config } from '../config'
import { Weather } from '../models'
import { error } from '../utils/log'

export class WeatherService {

  static async getLatestWeatherInfo( citySymbol: string ) {
    return await axois.post(config.WEATHER_API_BASE_URL + citySymbol + '&APPID=' + config.SECRET)
      .then( e => {
        return { success: true, data: e }
      } )
      .catch( err => {
        error(err.message)
        return { success: false }
      })
  }

  static async updateWeatherInfo( citySymbol: string ) {
    let value = await WeatherService.getLatestWeatherInfo( citySymbol )
    if ( !value.success )
      return null
    return await Weather.create({
      data: JSON.stringify(value),
      captureTime: new Date().toISOString()
    })
      .then(_ => true)
      .catch( err => {
        error(err)
        return false
      })
  }

}