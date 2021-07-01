import express, {
  Request,
  Response,
} from 'express';
import { object, string } from 'joi'
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

import { verificationMiddleware, ACL_admin } from '../middleware';
import { StationService, WeatherService } from '../model';

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
  let w: any = await WeatherService.getLatestWeatherInfo( 'London,uk' )
  let response: any = {
    weather: w.success ? w.data : {},
    stations: stations
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

stationsRouter.post('/', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
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

