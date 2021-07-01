import { and, Op } from 'sequelize'
import { isEmpty } from 'lodash'

import { Weather    } from '../models'
import { config     } from '../config'
import { error      } from '../utils/log'
import { weatherApi } from '../utils/weather_api'

export class WeatherService {

  /**
   * @param  {string} citySymbol
   * @param  {Date} time?
   * @returns Promise
   */
  static async getLatestWeatherInfo( citySymbol: string, time?: Date ): Promise<any> {
    if ( !time )
      time = new Date(2001, 1, 1)
    return await Weather.findAll({
      where: and(
        { city: citySymbol },
        { createdAt: {
            [Op.gt]: time,
            [Op.lt]: new Date()
          }
        }
      ),
      offset: config.PAGE_OFFSET,
      limit: config.PAGE_LIMIT,
      order: [
        ['createdAt', 'DESC' ]
      ],
      raw: true
    })
      .then( (d: any) => {
        if ( isEmpty(d) )
          return
        for ( let item of d ) {
          item.data = JSON.parse(item.data)
        }
        return d
      })
  }

  /**
   * @param  {string} citySymbol
   * @returns Promise
   */
  static async updateWeatherInfo( citySymbol: string ): Promise<any> {
    let value = await weatherApi( citySymbol )
    if ( !value.success )
      return false
    let e = {
        city: citySymbol,
        data: JSON.stringify(value.data),
      }
    return await Weather.create(e)
      .then(_ => true)
      .catch( err => {
        error(err)
        return false
      })
  }

}