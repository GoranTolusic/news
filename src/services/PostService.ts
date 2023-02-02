import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { NotFound } from "@tsed/exceptions";
import { Post } from "../entity/Post";
import { ObjectId } from "bson"
import { CreatePost } from "../validationTypes/CreatePost";
import { ExternalNews } from "../entity/ExternalNews";
import { omit, pick } from "lodash";

@Service()
class PostService {
	public postRepository
	public externalRepository
	constructor() {
		this.postRepository = AppDataSource.getMongoRepository(Post)
		this.externalRepository = AppDataSource.getMongoRepository(ExternalNews)
	}

	async create(inputs: CreatePost) {
		let findExternal = await this.externalRepository.findOneBy({ _id: this.checkAndGetId(inputs.externalNewsId) })
		if (!findExternal) throw new NotFound('External news with provided Id was not found')
		let formatedModel = this.formatNewsObject(findExternal, inputs)
		if (formatedModel.breakingNews) await this.unsetBreakingNews()
		return await this.postRepository.save(formatedModel)
	}

	async get(id: string) {
		let post = await this.postRepository.findOneBy({ _id: this.checkAndGetId(id) })
		if (!post) throw new NotFound('Not Found')
		let increaseCount = post.viewCount + 1
		await this.postRepository.updateOne({ _id: this.checkAndGetId(String(post._id)) }, { $set: { viewCount: increaseCount } })
		return post
	}

	async delete(id: string) {
		await this.postRepository.deleteOne({ _id: this.checkAndGetId(id) })
		return { message: 'deleted' }
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
		return {
			...omit(inputs, ['externalNewsId']),
			...pick(externalNews, ['title', 'description', 'urlToImage', 'url'])
		}
	}

	async unsetBreakingNews() {
		await this.postRepository.updateMany(
			{ breakingNews: true },
			{ $set: { breakingNews: false } }
		)
	}

}

export default PostService;