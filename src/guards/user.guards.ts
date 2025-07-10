import bcrypt from "bcrypt"

// hash password
export const hashPassword = (password:string)=>{
return bcrypt.hashSync(password,10)
}

// compare password
export const comparePassword = (password:string,hash:string)=>{
    return bcrypt.compare(password,hash)
}
