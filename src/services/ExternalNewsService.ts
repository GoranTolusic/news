import { Service } from "typedi";
import NewsAPI from "ts-newsapi";
import { ExternalNewsQuery } from "../../types/ExternalNewsQuery";
import { ExternalNews } from "../entity/ExternalNews";
import { INewsApiArticle } from "ts-newsapi";
import { omit } from "lodash";
import { AppDataSource } from "../helpers/data-source";

@Service()
class ExternalNewsService {
    public newsApi
    public externalNewsRepository
    private default
    private apiKey
    private params

    constructor(params: ExternalNewsQuery) {
        this.params = params
        this.apiKey = process.env.NEWS_APIKEY
        this.newsApi = new NewsAPI(this.apiKey || '')
        this.default = process.env.NEWS_TYPE_FOR_SEED,
        this.externalNewsRepository = AppDataSource.getMongoRepository(ExternalNews)
    }

    async getTopHeadlines(params: ExternalNewsQuery) {
        return await this.newsApi.getTopHeadlines(params)
    }

    async getEverything(params: ExternalNewsQuery) {
        return await this.newsApi.getEverything(params)
    }

    async seedDefault() {
        let fetchedData
        switch (this.default) {
            case 'topheadlines':
                fetchedData = await this.getTopHeadlines(this.params)
                break;
            case 'everything':
                fetchedData = await this.getEverything(this.params)
                break;
            default:
                console.error("\x1b[31m", 'WARNING: Invalid variable option for in env for NEWS_TYPE_FOR_SEED, choose "everything" or "topheadlines"', '\x1b[0m')  
                return false
        }
        if (fetchedData?.status !== 'ok') throw new Error ('Something went wrong, please check you param configuration and try again')
        let mappedData = this.mapData(fetchedData.articles)
        return await this.insertFetchedData(mappedData)
    }

    mapData(results: INewsApiArticle[]) {
        console.log("\x1b[32m", 'Formating data ...', '\x1b[0m')
        return results.map(function(item) {
            return {
                ...omit(item, ['source']),
                createdAt: Date.now(),
                source: item.source?.name || null
            }
        })
    }

    async insertFetchedData(mappedData: any[]) {
        console.log("\x1b[32m", 'Inserting data ...', '\x1b[0m')
        await this.externalNewsRepository.insertMany(mappedData)
        console.log("\x1b[32m", 'DONE!', '\x1b[0m')
        return true
    }

    ping() {
        let areWeReady = (!this.default || !this.apiKey) ? false : true
        if (areWeReady) console.log("\x1b[32m", 'Fetching Data from external source. Please wait ...', '\x1b[0m')
            else console.error("\x1b[31m", 'WARNING: Set NEWS env variables please, and run installation again please', '\x1b[0m')  
        return areWeReady
    }
}

export default ExternalNewsService;