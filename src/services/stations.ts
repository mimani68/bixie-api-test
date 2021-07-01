import { readFileSync } from 'fs';
import { or, and } from 'sequelize'
import { config } from '../config'
import { Stations } from '../models'
import { error } from '../utils/log'

const LIMIT = 100;
const OFFSET = 0;

export class StationService {

  static async getAllStations() {
    return await Stations.findAll()
  }

  static async queryOnStations(from: string, sicne: string) {
    return await Stations.findAll({
      where: and(
        { captureTime: { gte: from } },
        { captureTime: { lte: sicne } }
      ),
      offset: OFFSET,
      limit: LIMIT
    })
  }

  static async queryOnStationsIds(stationId: string, from: string, sicne: string) {
    return await Stations.findAll({
      where: and(
        { station_id: stationId },
        { captureTime: { gte: from }},
        { captureTime: { lte: sicne }}
      ),
      order: [
        ['captureTime', 'DESC' ]
      ],
      offset: OFFSET,
      limit: LIMIT
    })
  }

  static async updateStationData() {
    let value = await StationService.getApi()
    let e = []
    for ( let item of value.features ) {
      e.push({
        station_id: item.properties.id,
        data: JSON.stringify(item.properties),
        captureTime: new Date().toISOString()
      })
    }
    return await Stations.bulkCreate(e)
      .then(_ => true)
      .catch( err => {
        error(err)
        return false
      })
  }

  static async getApi() {
    let e = readFileSync('db.json', 'utf-8')
    try {
      return await JSON.parse(e)
    } catch (error) {
      return { message: 'failed parse json' }
    }
  }

}