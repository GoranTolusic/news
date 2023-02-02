import { Entity, Column, ObjectIdColumn, Index } from "typeorm"
import { ObjectId } from "bson"
import { User } from "./User"

@Entity()
export class Post {
    @ObjectIdColumn()
    _id: ObjectId

    @Column({ default: 0 })
    viewCount: number

    @Column({ default: false })
    breakingNews: boolean

    @Column()
    title: string

    @Column()
    shortDescription: string

    @Column()
    description: string

    @Column()
    category: string

    @Column()
    urlToImage: string | null
    
    @Column()
    content: string | null

    @Column()
    createdAt: number

    @Column()
    updatedAt: number

    @Column((type) => User)
    user: User

}
