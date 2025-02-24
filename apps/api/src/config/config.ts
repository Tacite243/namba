import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET as string,
    nodeEnv: process.env.NODE_ENV || "development",
    database: process.env.DATABASE_URL,
}