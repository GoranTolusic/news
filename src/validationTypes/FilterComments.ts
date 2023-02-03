import { Entity } from "typeorm"
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

@Entity()
export class FilterComments {

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

    @IsNotEmpty()
    @IsString()
    _postId: string

    //These input properties will get extracted from input params.
    static pickedProps(): string[] {
        return ['page', 'limit', 'order']
    }
}
