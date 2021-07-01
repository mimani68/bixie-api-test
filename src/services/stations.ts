import { isEmpty } from 'lodash'
import { Op, and } from 'sequelize'

import { config     } from '../config'
import { Stations   } from '../models'
import { error      } from '../utils/log'
import { stationApi } from '../utils/station_api'

export class StationService {

  /**
   * 
   * @returns Promise
   * 
   */
  static async getAllStations(): Promise<any> {
    return await Stations.findAll({ 
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
   * @param  {Date} from
   * @param  {Date} sicne
   * @returns Promise
   */
  static async queryOnStations(from: Date, sicne: Date): Promise<any> {
    return await Stations.findAll({
      where: and(
        { createdAt: { gte: from } },
        { createdAt: { lte: sicne } }
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
   * @param  {string} stationId
   * @param  {Date} from
   * @param  {Date} sicne
   * @returns Promise
   */
  static async queryOnStationsIds(stationId: string, from: Date, sicne: Date): Promise<any> {
    return await Stations.findAll({
      where: and(
        { station_id: stationId },
        { createdAt: {
            [Op.gt]: from ,
            [Op.lt]: sicne
          }
        }
      ),
      order: [
        ['createdAt', 'DESC' ]
      ],
      offset: config.PAGE_OFFSET,
      limit: config.PAGE_LIMIT,
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
   * @returns Promise
   */
  static async updateStationData(): Promise<any> {  
    let value = await stationApi()
    if ( !value.success )
      return false
    let e = []
    for ( let item of value.data.features ) {
      e.push({
        station_id: item.properties.id,
        data: JSON.stringify(item.properties),
      })
    }
    return await Stations.bulkCreate(e)
      .then(_ => true)
      .catch( err => {
        error(err)
        return false
      })
  }

}