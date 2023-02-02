import { Entity, Column, ObjectIdColumn, Index } from "typeorm"
import { ObjectId } from "bson"

@Entity()
export class ExternalNews {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    source: string | null

    @Column()
    author: string | null

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    url: string

    @Column()
    urlToImage : string

    @Column('date')
    publishedAt: Date | null

    @Column()
    content: string | null

    @Column()
    createdAt: number
}
