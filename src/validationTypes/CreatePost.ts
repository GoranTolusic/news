import { Entity } from "typeorm"
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"

@Entity()
export class CreatePost {

    @IsString()
    @IsNotEmpty()
    externalNewsId: string

    @IsBoolean()
    @IsOptional()
    breakingNews: boolean = false

    @IsOptional()
    @IsIn(['worldwide', 'local', 'sport', 'business'])
    category: string

    readonly createdAt: number = Date.now()

    readonly viewCount: number = 0

    readonly updatedAt: number = Date.now()

    //These input properties will get extracted from input params.
    static pickedProps(): string[] {
        return ['externalNewsId', 'breakingNews', 'category']
    }
}
