import { readFileSync } from 'fs'
import { cwd } from 'process'

export async function stationApi() {
    const file_path = cwd() + '/src/utils/station_api/db.json'
    let e = readFileSync(file_path, 'utf-8')
    try {
        return await JSON.parse(e)
    } catch (error) {
        return {
            message: 'failed parse json'
        }
    }
}