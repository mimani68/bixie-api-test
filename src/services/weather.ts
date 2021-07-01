import { Weather } from '../models'
import { error } from '../utils/log'
import { weatherApi } from '../utils/weather_api'

export class WeatherService {

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