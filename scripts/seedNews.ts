import dotenv from 'dotenv';
import { ExternalNewsQuery } from '../types/ExternalNewsQuery';
import ExternalNewsService from "../src/services/ExternalNewsService";
import { exit } from 'process';
dotenv.config();

//Some query params for searching news data
const querySearch: ExternalNewsQuery = {
    pageSize: 20,
    page: 1,
    country: 'gb'
}

//Fetch news data, map it and insert into local database
async function seedNewsData(params: ExternalNewsQuery) {
    let service = new ExternalNewsService(params)
    let pong = service.ping()
    if (!pong) exit()
    await service.seedDefault()
}

//Start the process
seedNewsData(querySearch)
