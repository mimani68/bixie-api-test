import express, { Request, Response } from 'express';
import { object, string } from 'joi'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { verificationMiddleware } from '../middleware';
import { StationService, WeatherService } from '../services';
import { config } from '../config';

let lastUpdate = new Date();
const UPDATE_INTERVAL_IN_HOURS = 1;

export const stationsRouter = express.Router();

stationsRouter.get('/', verificationMiddleware, async (req: Request, res: Response) => {
  let querySchema = object({
    at: string().isoDate().required()
  })
  let { error, value } = querySchema.validate( req.query ) 
  let stations;
  if ( !error ) {
    stations = await StationService.queryOnStations( req.params.at )
  } else {
    stations = await StationService.getAllStations()
  }
  let w: any = await WeatherService.getLatestWeatherInfo( config.CITY )
  let response: any = {
    weather: w.success ? w.data : {},
    // stations: stations
  }
  if ( !error && req.query.at ) {
    response['at'] = req.query.at.toString()
  }
  return res
    .status(StatusCodes.OK)
    .json(response);
});

stationsRouter.get('/:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

/**
 * 
 * Update data
 * 
 */
stationsRouter.post('/', verificationMiddleware, async (req: Request, res: Response) => {
  let nextStoreData = new Date(lastUpdate)
  nextStoreData.setHours( nextStoreData.getHours() + +UPDATE_INTERVAL_IN_HOURS )
  if ( nextStoreData < new Date() ) {
    let s: any = await StationService.updateStationData()
    let w: any = await WeatherService.getLatestWeatherInfo( config.CITY )
    nextStoreData = new Date()
    return res
      .status(StatusCodes.CREATED)
      .json(ReasonPhrases.CREATED);
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ReasonPhrases.BAD_REQUEST);
  }
});

stationsRouter.put('/:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.delete('/:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

