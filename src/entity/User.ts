import { Entity, ObjectID, Column, ObjectIdColumn } from "typeorm"

@Entity('users')
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password?: string;

    @Column({ default: 'guest' })
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
