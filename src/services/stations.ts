import { isEmpty } from 'lodash'
import { or, and } from 'sequelize'

import { config } from '../config'
import { Stations } from '../models'
import { error } from '../utils/log'
import { stationApi } from '../utils/station_api'

const LIMIT  = 100;
const OFFSET = 0;

export class StationService {

  static async getAllStations() {
    return await Stations.findAll({ 
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

  static async queryOnStations(from: Date, sicne: Date) {
    return await Stations.findAll({
      where: and(
        { createdAt: { gte: from } },
        { createdAt: { lte: sicne } }
      ),
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

  static async queryOnStationsIds(stationId: string, from: string, sicne: string) {
    return await Stations.findAll({
      where: and(
        { station_id: stationId },
        { createdAt: { gte: from }},
        { createdAt: { lte: sicne }}
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

  static async updateStationData() {  
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