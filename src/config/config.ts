import dotenv from "dotenv"
dotenv.config()

export default{
    port :parseInt(process.env.PORT as string, 10),
    mongo_url: process.env.MONGO_URL as string,
    user: process.env.EMAIL_USER as string, 
    pass: process.env.EMAIL_PASS as string,
    base_Url: process.env.BASE_URL as string,
    SECRET_KEY: process.env.SECRET as string
}
