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
    @Index()
    breakingNews: boolean

    @Column()
    category: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    urlToImage: string

    @Column()
    url: string
    
    @Column()
    createdAt: number

    @Column()
    updatedAt: number

    //@Column((type) => User)
    //user: User

    @Column()
    @Index()
    idUser: string

}
