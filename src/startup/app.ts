import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';
import { roleRouter, userRouter } from '../routes';

export const app: Application = express();

app.use(json());

app.get('/ping', (req: Request, res: Response)=>{
    res.send('PONG');
});

/**
 * 
 * FAM Server
 * 
 */
app.use('/users',         userRouter);
app.use('/roles',         roleRouter);
// app.use('/networks',   networkRouter);
// app.use('/regions',    regionsRouter);
// app.use('/provinces',  provincesRouter);
// app.use('/projects',   projectRouter);
// app.use('/phases',     phasesRouter);
// app.use('/assets',     assestRouter);
// app.use('/docs',       docsRouter);
// app.use('/operations', operationsRouter);

app.use('', (req: Request, res: Response)=>{
    res.send('OPS');
});
