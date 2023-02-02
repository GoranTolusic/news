import "reflect-metadata"
import { DataSource } from "typeorm"
import { ExternalNews } from "../entity/ExternalNews"
import { User } from "../entity/User"
import dotenv from 'dotenv';
import { Post } from "../entity/Post";
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, ExternalNews, Post],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // ...
    }).catch((error) => console.log(error))
