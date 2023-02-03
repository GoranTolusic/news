import { Entity, Column, ObjectIdColumn, Index } from "typeorm"
import { ObjectId } from "bson"
import { User } from "./User"

@Entity()
export class Comment {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    content: string
    
    @Column()
    createdAt: number

    @Column()
    @Index()
    _userId: string

    @Column()
    @Index()
    _userAlias: string

    @Column()
    @Index()
    _postId: string

}
