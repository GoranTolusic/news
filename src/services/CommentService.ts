import { Service } from "typedi";
import { AppDataSource } from "../helpers/data-source";
import { NotFound } from "@tsed/exceptions";
import { Post } from "../entity/Post";
import { ObjectId } from "bson"
import { CreateComment } from "../validationTypes/CreateComment";
import { Comment } from "../entity/Comment";

@Service()
class CommentService {
	public postRepository
	public commentRepository
	constructor() {
		this.postRepository = AppDataSource.getMongoRepository(Post)
		this.commentRepository = AppDataSource.getMongoRepository(Comment)
	}

	async create(inputs: CreateComment) {
		let findPost = await this.postRepository.findOneBy({ _id: this.checkAndGetId(inputs._postId) })
		if (!findPost) throw new NotFound('Post with provided Id was not found')
		return await this.commentRepository.save(inputs)
	}

	async delete(id: string) {
		await this.commentRepository.deleteOne({ _id: this.checkAndGetId(id) })
		return { message: 'deleted' }
	}

	async filter(inputs: any) {
		let { page, limit, order, _postId } = inputs
		limit = limit || 20
		let findPost = await this.postRepository.findOneBy({ _id: this.checkAndGetId(_postId) })
		if (!findPost) throw new NotFound('Post with provided Id was not found')

		let results = await this.commentRepository.find({
			where : {
				_postId: _postId
			},
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


}

export default CommentService;