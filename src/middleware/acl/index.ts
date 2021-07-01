import { Request, Response, NextFunction } from "express";

export function ACL_admin(req: Request, res: Response, next: NextFunction) {
    next()
}