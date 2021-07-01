import express, {
  Request,
  Response,
} from 'express';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

import { verificationMiddleware, ACL_admin } from '../middleware';
import { Station } from '../model';

export const stationsRouter = express.Router();

stationsRouter.get('/', verificationMiddleware, async (req: Request, res: Response) => {
  let result = await Station.getAllStations()
  return res
    .status(StatusCodes.OK)
    .json(result);
});

stationsRouter.get('//:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.post('/', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.put('//:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.delete('//:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

