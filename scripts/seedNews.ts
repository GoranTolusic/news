import dotenv from 'dotenv';
import { News } from '../types/News';
import ExternalNewsService from "../src/services/ExternalNewsService";
import { exit } from 'process';
dotenv.config();

//Some query params for searching news data
const querySearch: News = {
    pageSize: 20,
    page: 1,
    country: 'gb',
}

//Fetch news data, map it and insert into local database
async function seedNewsData(params: News) {
    let service = new ExternalNewsService(params)
    let pong = service.ping()
    if (!pong) exit()
    return await service.seedDefault()
}

//Start the process
seedNewsData(querySearch)
