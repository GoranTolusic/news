import { Entity } from "typeorm"
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"

@Entity()
export class CreatePost {

    @IsString()
    @IsNotEmpty()
    externalNewsId: string

    @IsBoolean()
    @IsOptional()
    breakingNews: boolean

    @IsOptional()
    @IsIn(['worldwide', 'local', 'sport', 'business'])
    category: string

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['externalNewsId', 'breakingNews', 'category']
    }
}
