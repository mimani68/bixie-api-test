import { readFileSync } from 'fs'

export async function stationApi() {
    let e = readFileSync('db.json', 'utf-8')
    try {
        return await JSON.parse(e)
    } catch (error) {
        return {
            message: 'failed parse json'
        }
    }
}