import { Entity, Column, ObjectIdColumn, Index } from "typeorm"
import { ObjectId } from "bson"

@Entity()
export class ExternalNews {
    @ObjectIdColumn()
    _id?: ObjectId

    @Column()
    source: string | null

    @Column()
    author: string | null

    @Column()
    title: string | null

    @Column()
    description: string | null

    @Column()
    url: string | null

    @Column()
    urlToImage : string | null

    @Column('date')
    publishedAt: Date | null

    @Column()
    content: string | null

    static pickedProps(): string[] {
        return ['source', 'author', 'title', 'description', 'url', 'urlToimage', 'publishedAt', 'content']
    }
}
