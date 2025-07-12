import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config"
// hash password
export const hashPassword = (password:string)=>{
return bcrypt.hashSync(password,10)
}

// compare password
export const comparePassword = (password:string,hash:string)=>{
    return bcrypt.compare(password,hash)
}

// jwt secret

export const createJwt = (user:any)=>{
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        config.SECRET_KEY,
        {expiresIn:"8h"}
    );
    return token;
}