import axois, { Method } from 'axios'

import { config } from '../config'
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
    return await WeatherService.getLatestWeatherInfo( citySymbol )
      .then( el => {
        
        return true
      })
      .catch( err => {
        return false
      })
  }

}