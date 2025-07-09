import { Response } from "express";

class ResponseHandler{
    static success(
        res:Response,
        data:any,
        message:"user successfully created",
        statusCode: number = 200
    ):
    void{
        res.status(statusCode).json({
            status:"success",
            message,
            data
        })
    }

    static created(
        res:Response,
        data:any,
        message:string = "Operation Successful",
        statusCode:number = 201
    ): void{
        res.status(statusCode).json({
            status:"success",
            message,
            data
        })
    }

    static error(
        res:Response,
        data:any,
        message:string = "Operation failed",
        statusCode:number = 500
    ):
    void{
        res.status(statusCode).json({
            status:"Operation failed",
            message,
            data
        })
    }

    static validationError(
        res:Response,
        data:any,
        message: string= "Validation error",
        statusCode:number = 400
    ):
    void{
        res.status(statusCode).json({
            status:"error",
            message,
            data
        })
    }

    static notFound(
        res:Response,
        data:any,
        message:string = "Resource not found",
        statusCode:number = 404
    ):
    void{
        res.status(statusCode).json({
            status:this.error,
            message,
            data
        })
    }
}

export default ResponseHandler;