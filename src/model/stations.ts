import { readFileSync } from 'fs'
import { get } from 'config'

const filePath = `${ get('db.file_path') }`

export class Station {

  static async getAllStations() {
    return readFileSync(filePath, 'utf-8')
  }

}