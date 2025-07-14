import { Request,Response,NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler";
import jwt from "jsonwebtoken"
import config from "../config/config";
import userModel from "../models/user.model";



interface DecodedToken{
    email : string,
    id: string
}

export const isLoggedIn =  async (req:Request, res:Response, next:NextFunction)=>{
    // get token from req header
    const authHeader = req.headers.authorization;

    // verify token, cjeck if token exists and starts with Bearer
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return ResponseHandler.validationError (res,  "not authorized.No token provided")
        
    }
    // extract tken ; this method remives Bearer and leaves just d token
    
    const token = authHeader.split(" ")[1]

    try {
        // Verify token
        const decoded = jwt.verify(token, config.SECRET_KEY) as DecodedToken;
        
        // Find user and attach to request
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return ResponseHandler.validationError(res, "User not found");
        }
        
        // i  need to update express types to accomodate a custom propety cos req.user is not a default express prop
        req.user = {
            id: user.id,
            email: user.email,
            role : user.role
        }; 
        next();
    } catch (error) {
        return ResponseHandler.validationError(res, "Invalid token");
    }

    next()
}
