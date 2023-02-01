import { Service } from "typedi";
import NewsAPI from "ts-newsapi";
import { News } from "../../types/News";

@Service()
class ExternalNewsService {
    public newsApi
    private default
    private apiKey
    private params

    constructor(params: News) {
        this.params = params
        this.apiKey = process.env.NEWS_APIKEY
        this.newsApi = new NewsAPI(this.apiKey || '')
        this.default = process.env.NEWS_TYPE_FOR_SEED
    }

    async getTopHeadlines(params: News) {
        return await this.newsApi.getTopHeadlines(params)
    }

    async getEverything(params: News) {
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
        await this.insertFetchedData(mappedData)
        console.log("\x1b[32m", 'DONE!', '\x1b[0m')
    }

    mapData(results: any[]) {
        //TODO kreirati schemu za news u entitetima i izmapirati datu
        console.log("\x1b[32m", 'Formating data ...', '\x1b[0m')
        return results
    }

    async insertFetchedData(mappedData: any) {
        //TODO pozvati news repo i insertati
        console.log("\x1b[32m", 'Inserting data ...', '\x1b[0m')
        mappedData
    }

    ping() {
        let areWeReady = (!this.default || !this.apiKey) ? false : true
        if (areWeReady) console.log("\x1b[32m", 'Fetching Data from external source. Please wait ...', '\x1b[0m')
            else console.error("\x1b[31m", 'WARNING: Set NEWS env variables please, and run installation again please', '\x1b[0m')  
        return areWeReady
    }
}

export default ExternalNewsService;