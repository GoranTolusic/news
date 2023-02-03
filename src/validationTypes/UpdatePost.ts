import { Entity } from "typeorm"
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"

@Entity()
export class UpdatePost {

    @IsBoolean()
    @IsOptional()
    breakingNews: boolean = false

    @IsOptional()
    @IsIn(['worldwide', 'local', 'sport', 'business'])
    category: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    url: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    urlToImage: string

    readonly updatedAt: number = Date.now()

    //These input properties will get extracted from input params.
    static pickedProps(): string[] {
        return ['breakingNews', 'category', 'title', 'description', 'url', 'urlToImage']
    }
}
