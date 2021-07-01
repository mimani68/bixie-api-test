import { readFileSync } from 'fs'
import { config } from '../config'

const filePath = config.FILE_PATH

export class StationService {

  static async getAllStations() {
    let e = readFileSync(filePath, 'utf-8')
    try {
      return await JSON.parse(e)
    } catch (error) {
      return { message: 'failed parse json' }
    }
  }

  static async queryOnStations(at: string) {
    let e = await StationService.getAllStations()
    if ( Array.isArray(e) ) {
      return e.filter( ( el: any ) => el.date === at )
    } else {
      return null
    }
  }

}