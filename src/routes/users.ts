import express, {
  Request,
  Response,
} from 'express';
import {
  sign,
  verify
} from 'jsonwebtoken';
import { config } from '../config'
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

import {
  CheckPassword,
  hashPassword
} from '../utils/token'

import { verificationMiddleware, ACL_admin } from '../middleware';

const SECRET: string = config.SECRET;

export const userRouter = express.Router();

userRouter.get('/users', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.get('/users/:userId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.post('/users', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.put('/users/:userId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.delete('/users/:userId', verificationMiddleware, (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.post('/sign-up', async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.post('/login', async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});

userRouter.post('/logout', async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_IMPLEMENTED)
    .send(ReasonPhrases.NOT_IMPLEMENTED);
});