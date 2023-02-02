import { Service } from "typedi";
import { ObjectLiteral } from "typeorm";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../entity/User";
import CreateUser from "../validationTypes/CreateUser";
import { BadRequest, Forbidden, NotFound } from "@tsed/exceptions";
import HashService from "./HashService";
import AuthService from "./AuthService";
import { omit } from "lodash"
import { Post } from "../entity/Post";
import { ObjectId } from "bson"

@Service()
class PostService {
	public postRepository
	constructor() {
		this.postRepository = AppDataSource.getMongoRepository(Post)
	}

	async create(inputs: CreateUser) {
	
	}

	async get(id: string) {
		let user = await this.postRepository.findOneBy({ _id: new ObjectId(id)})
		if (!user) throw new NotFound('User Not Found')
		return user
	}

}

export default PostService;