import axois from 'axios'

import { config } from '../../config'
import { error } from '../log'

export async function weatherApi(citySymbol: string) {
    return await axois.post(config.WEATHER_API_BASE_URL + citySymbol + '&APPID=' + config.SECRET)
        .then(e => {
            return {
                success: true,
                data: e
            }
        })
        .catch(err => {
            error(err.message)
            return {
                success: false
            }
        })
}