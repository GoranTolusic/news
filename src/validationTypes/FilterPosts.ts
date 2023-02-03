import { Entity } from "typeorm"
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

@Entity()
export class FilterPosts {

    @IsBoolean()
    @IsOptional()
    breakingNews: boolean = false

    @IsOptional()
    @IsArray()
    category: string[]

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    page: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    limit: number

    @IsOptional()
    @IsIn(['ASC', 'DESC', 'asc', 'desc'])
    order: string

    //These input properties will get extracted from input params.
    static pickedProps(): string[] {
        return ['breakingNews', 'category', 'page', 'limit', 'order']
    }
}
