import express, { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { object, string } from 'joi'

import { verificationMiddleware         } from '../middleware';
import { StationService, WeatherService } from '../services';
import { ResponseModelInterface         } from '../view_model';
import { config } from '../config';

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
  if ( validationObject?.error ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST);
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
  let querySchema;
  let validationObject;
  if ( req.query.at ) {
    querySchema = object({
      stationsId: string().required(),
      at: string().isoDate().required()
    })
    // validationObject = querySchema.validate( req.query )
    validationObject = querySchema.validate({
      at: req.query.at,
      stationsId: req.params.stationsId
    }) 
  }
  if ( req.query.from && req.query.to && req.query.frequency ) {
    querySchema = object({
      stationsId: string().required(),
      from: string().isoDate().required(),
      to: string().isoDate().required(),
      frequency: string().required()
    })
    validationObject = querySchema.validate({
      from: req.query.from,
      to: req.query.to,
      stationsId: req.params.stationsId
    })
  }
  if ( validationObject?.error ) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(ReasonPhrases.NOT_FOUND);
  }
  /**
   * 
   * Retrive data by stationId
   * 
   */
  let s;
  let w;
  if ( req.query.at ) {
    s = await StationService.queryOnStationsIds(req.params.stationsId, new Date(`${ req.query.at }`), new Date());
    w = await WeatherService.getLatestWeatherInfo( config.CITY )
  }
  if ( req.query.from ) {
    s = await StationService.queryOnStationsIds(req.params.stationsId, new Date(`${ req.query.from }`), new Date(`${ req.query.to }`));
    w = await WeatherService.getLatestWeatherInfo( config.CITY )
  }
  /**
   * 
   * Show the finial result
   * 
   */
  let response: ResponseModelInterface = {
    weather: w,
    stations: s,
    at: `${ req.query.at }`
  }
  res
    .status(StatusCodes.OK)
    .send(response);
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

