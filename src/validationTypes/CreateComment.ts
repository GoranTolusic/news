import { Entity } from "typeorm"
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"

@Entity()
export class CreateComment {

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    @IsNotEmpty()
    _postId: string

    readonly createdAt: number = Date.now()

    //These input properties will get extracted from input params.
    static pickedProps(): string[] {
        return ['content', '_postId']
    }
}
