import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { NotFound } from "@tsed/exceptions";
import { Post } from "../entity/Post";
import { ObjectId } from "bson"
import { CreatePost } from "../validationTypes/CreatePost";
import { ExternalNews } from "../entity/ExternalNews";
import { omit, pick } from "lodash";
import { UpdatePost } from "../validationTypes/UpdatePost";

@Service()
class PostService {
	public postRepository
	public externalRepository
	public myDataSource
	constructor() {
		this.postRepository = AppDataSource.getMongoRepository(Post)
		this.externalRepository = AppDataSource.getMongoRepository(ExternalNews)
		this.myDataSource = AppDataSource
	}

	async create(inputs: CreatePost) {
		let findExternal = await this.externalRepository.findOneBy({ _id: this.checkAndGetId(inputs.externalNewsId) })
		if (!findExternal) throw new NotFound('External news with provided Id was not found')
		let formatedModel = this.formatNewsObject(findExternal, inputs)
		if (formatedModel.breakingNews) await this.unsetBreakingNews()
		return await this.postRepository.save(formatedModel)
	}

	async update(inputs: UpdatePost, id: string) {
		let post = await this.postRepository.findOneBy({ _id: this.checkAndGetId(id) })
		if (!post) throw new NotFound('Not Found')
		Object.assign(post, inputs)
		post = await this.validateBreakingNews(post)
		await this.postRepository.updateOne({ _id: this.checkAndGetId(id) }, { $set: omit(post, ['_id']) })
		return post
	}

	async get(id: string) {
		let post = await this.postRepository.findOneBy({ _id: this.checkAndGetId(id) })
		if (!post) throw new NotFound('Not Found')
		let increaseCount = post.viewCount + 1
		await this.postRepository.updateOne({ _id: this.checkAndGetId(String(post._id)) }, { $set: { viewCount: increaseCount } })
		post = await this.validateBreakingNews(post)
		return post
	}

	async delete(id: string) {
		await this.postRepository.deleteOne({ _id: this.checkAndGetId(id) })
		return { message: 'deleted' }
	}

	async filter(inputs: any) {
		let { page, limit, category, breakingNews, order } = inputs
		limit = limit || 20
		const where: Record<string, any> = {}

		if (inputs.hasOwnProperty('breakingNews')) where.breakingNews = breakingNews
		if (category) where.category = { $in: category }

		let results = await this.postRepository.find({
			where,
			order: {
				createdAt: order || 'DESC'
			},
			take: limit,
			skip: page ? (page - 1) * limit : 0

		})
		return results
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

	async validateBreakingNews(post: Post, unset = true) {
		if (post.breakingNews) {
			//miliseconds in 48 hours. Formula : (((60 * 60) * 24) * 2) *1000
			let breakingNewsInterval = 172800000
			let timestampDifference = Date.now() - post.updatedAt
			if (timestampDifference >= breakingNewsInterval) {
				post.breakingNews = false
				if (unset) await this.unsetBreakingNews()
			}
		}
		return post
	}
}

export default PostService;