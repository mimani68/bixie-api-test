import express, { Request, Response } from 'express';
import { object, string } from 'joi'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { verificationMiddleware } from '../middleware';
import { StationService, WeatherService } from '../services';
import { config } from '../config';
import { ResponseModelInterface } from '../view_model';

let lastUpdate = new Date();
const UPDATE_INTERVAL_IN_HOURS = 1;

export const stationsRouter = express.Router();

/**
 * 
 * Retrive all datas
 * 
 */
stationsRouter.get('/', verificationMiddleware, async (req: Request, res: Response) => {
  let querySchema: any;
  let validationObject: any;
  /**
   * 
   * validate input value from user
   * 
   */
  if ( req.query.at ) {
    querySchema = object({
      at: string().isoDate().required()
    })
    validationObject = querySchema.validate( req.query )
  }
  if ( req.query.from && req.query.to && req.query.frequency ) {
    querySchema = object({
      from: string().isoDate().required(),
      to: string().isoDate().required(),
      frequency: string().required()
    })
    validationObject = querySchema.validate( req.query )
  }
  /**
   * 
   * User `StationService` and `WeatherService` for retrive data from
   * database
   * 
   */
  let s: any;
  let w: any;
  if ( validationObject && !validationObject.error ) {
    s = await StationService.queryOnStations( new Date(`${req.query.at}`), new Date() )
    w = await WeatherService.getLatestWeatherInfo( config.CITY, new Date(`${req.query.at}`) )
  } else {
    s = await StationService.getAllStations()
    w = await WeatherService.getLatestWeatherInfo( config.CITY )
  }
  /**
   * 
   * Create final responce
   * 
   */
  let response: ResponseModelInterface = {
    weather: w,
    stations: s
  }
  if ( validationObject && !validationObject.error && req.query.at ) {
    response['at'] = req.query.at.toString()
  }
  return res
    .status(StatusCodes.OK)
    .json(response);
});

/**
 * 
 * Retrive single stations data with id
 * 
 */
stationsRouter.get('/:stationsId', verificationMiddleware, async (req: Request, res: Response) => {
  /**
   * 
   * validate input value from user
   * 
   */
  let inputSchema = object({
    stationsId: string().required(),
    at: string().isoDate().required()
  })
  let { error, value } = inputSchema.validate({ at: req.query.at, stationsId: req.params.stationsId }) 
  if ( error ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST);
  }
  let station = await StationService.queryOnStationsIds(req.params.stationsId, `${ req.query.at }`, new Date().toISOString());
  res
    .status(StatusCodes.OK)
    .send(station);
});

/**
 * 
 * Update data
 * 
 */
stationsRouter.post('/', verificationMiddleware, async (req: Request, res: Response) => {
  let nextStoreData = new Date(lastUpdate)
  nextStoreData.setHours( nextStoreData.getHours() + +UPDATE_INTERVAL_IN_HOURS )
  if ( nextStoreData <= new Date() ) {
    await StationService.updateStationData()
    await WeatherService.updateWeatherInfo( config.CITY )
    nextStoreData = new Date()
    return res
      .status(StatusCodes.CREATED)
      .send(ReasonPhrases.CREATED);
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST);
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

