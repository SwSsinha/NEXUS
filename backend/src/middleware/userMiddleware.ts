import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    
    if (!header) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }

    try {
        const decoded = jwt.verify(header, JWT_PASSWORD);
        if (decoded) {
            if (typeof decoded === "string") {
                return res.status(403).json({
                    message: "You are not logged in"
                });
            }
            req.userId = (decoded as JwtPayload).id;
            next();
        } else {
            return res.status(403).json({
                message: "You are not logged in"
            });
        }
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}
