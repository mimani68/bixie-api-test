import { readFileSync } from 'fs'
import { get } from 'config'

const filePath = `${ get('App.db.file_path') }`

export class Station {

  static async getAllStations() {
    let e = readFileSync(filePath, 'utf-8')
    try {
      return await JSON.parse(e)
    } catch (error) {
      return { message: 'failed parse json' }
    }
  }

  static async queryOnStations(at: string) {
    let e = await Station.getAllStations()
    if ( Array.isArray(e) ) {
      return e.filter( ( el: any ) => el.date === at )
    } else {
      return null
    }
  }

}