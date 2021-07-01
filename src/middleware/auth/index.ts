import { Request, Response, NextFunction } from "express";

export function verificationMiddleware(req: Request, res: Response, next: NextFunction) {

    // const bearerHeader = req.headers['authorization'];

    // if (typeof bearerHeader !== 'undefined') {

    //     const bearer = bearerHeader.split(' ');
    //     const bearerToken = bearer[1];
    //     /* tslint:disable-next-line */
    //     // req.token = bearerToken;
    //     next();
    // } else {
    //     res.sendStatus(403)
    // }
    next()

}