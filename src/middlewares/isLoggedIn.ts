import { Request,Response,NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler";
import jwt from "jsonwebtoken"
import config from "../config/config";
import userModel from "../models/user.model";

export const isLoggedIn =  async (req:Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return ResponseHandler.validationError (res,  "not authorized.No token provided")
        
    }
    const token = authHeader.split(" ")[1]

    try {
        // Verify token
        const decoded = jwt.verify(token, config.SECRET_KEY) as any;
        
        // Find user and attach to request
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return ResponseHandler.validationError(res, "User not found");
        }
        
        // i  need to update express types to accomodate a custom propety cos req.user is not a default express prop
        req.user = user; 
        next();
    } catch (error) {
        return ResponseHandler.validationError(res, "Invalid token");
    }

    next()
}
