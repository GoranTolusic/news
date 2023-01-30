import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // ...
    }).catch((error) => console.log(error))
