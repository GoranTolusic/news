import { Service } from "typedi";
import { ObjectLiteral } from "typeorm";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import { BadRequest, Forbidden, NotFound } from "@tsed/exceptions";
import { omit } from "lodash"
import { Post } from "../entity/Post";
import { ObjectId } from "bson"
import { CreatePost } from "../validationTypes/CreatePost";
import { ExternalNews } from "../entity/ExternalNews";

@Service()
class PostService {
	public postRepository
	public externalRepository
	constructor() {
		this.postRepository = AppDataSource.getMongoRepository(Post)
		this.externalRepository = AppDataSource.getMongoRepository(ExternalNews)
	}

	async create(inputs: CreatePost) {
		let findExternal = await this.externalRepository.findOneBy({_id: this.checkAndGetId(inputs.externalNewsId)})
		if (!findExternal) throw new NotFound('External news with provided Id was not found')
		let readyForInsert = this.formatNewsObject(findExternal, inputs)
		
		return true
	}

	async get(id: string) {
		let user = await this.postRepository.findOneBy({ _id: this.checkAndGetId(id) })
		if (!user) throw new NotFound('Post Not Found')
		return user
	}

	checkAndGetId(id: string) {
		let objectId
		try {
			objectId = new ObjectId(id)
		} catch (e) {
			throw new NotFound('Invalid document id. Resource not found')
		}
		return objectId
	}

	formatNewsObject(externalNews: ExternalNews, inputs: CreatePost) {
		//TODO logika za napraviti post objekt
	}

}

export default PostService;