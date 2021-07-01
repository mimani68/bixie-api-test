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

}