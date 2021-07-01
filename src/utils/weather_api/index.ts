import axois from 'axios'

import { config } from '../../config'
import { error } from '../log'

export async function weatherApi(citySymbol: string): Promise<any> {
    let url = config.WEATHER_API_BASE_URL + citySymbol + '&APPID=' + config.WEATHER_API_KEY
    return await axois.get(url)
        .then(e => {
            return {
                success: true,
                data: e.data
            }
        })
        .catch(err => {
            error(err.message)
            return {
                success: false
            }
        })
}