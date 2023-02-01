import { Entity, Column, ObjectIdColumn, Index } from "typeorm"
import { ObjectId } from "bson"

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    alias: string

    @Column()
    @Index({ unique: true })
    email: string;

    @Column({ select: false })
    password?: string;

    @Column()
    role: string;

    @Column({ default: false })
    verified: boolean;

    @Column({ select: false })
    verifyToken: string;

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

}
