import { Entity } from "typeorm"
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

@Entity()
export class CreatePost {

    @IsString()
    @IsNotEmpty()
    externalNewsId: string

    @IsBoolean()
    @IsOptional()
    breakingNews: boolean

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['externalNewsId', 'breakingNews']
    }
}
