import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';
import * as helmet from 'helmet'
import * as cors from 'cors';

import { db } from '../db/postgres'
import { stationsRouter } from '../routes';

db.sync()

export const app: Application = express();

app.use(json());
app.use(cors.default())
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.get('/ping', (req: Request, res: Response)=>{
    res.send('PONG');
});

/**
 * 
 * Bixie Api Server
 * 
 */
app.use('/api/v1/stations', stationsRouter);

app.use('/healthz', (req: Request, res: Response)=>{
    res.send('Ok');
});
app.use('', (req: Request, res: Response)=>{
    res.send('OPS');
});
