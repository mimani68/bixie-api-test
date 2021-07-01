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

stationsRouter.get('/stations', verificationMiddleware, async (req: Request, res: Response) => {
  let result = await Station.getAllStations()
  res
    .status(StatusCodes.OK)
    .json(result);
});

stationsRouter.get('/stations/:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.post('/stations', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.put('/stations/:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.delete('/stations/:stationsId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.post('/sign-up', async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.post('/login', async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

stationsRouter.post('/logout', async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});