import { Entity, ObjectID, Column, ObjectIdColumn, Index } from "typeorm"

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID

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
