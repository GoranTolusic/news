import dotenv from 'dotenv';
import { ExternalNewsQuery } from '../types/ExternalNewsQuery';
import ExternalNewsService from "../src/services/ExternalNewsService";
import { exit } from 'process';
dotenv.config();

console.log('PREPARING FOR SEED NEWS')
//Some query params for searching news data
const querySearch: ExternalNewsQuery = {
    pageSize: 20,
    page: 1,
    country: 'gb'
}

//Fetch news data, map it and insert into local database
async function runSeedProcess(params: ExternalNewsQuery) {
    let service = new ExternalNewsService(params)
    let pong = service.ping()
    if (!pong) exit()
    let inserted = await service.seedDefault()
    if (inserted) exit()
}

//Start the process
runSeedProcess(querySearch)
