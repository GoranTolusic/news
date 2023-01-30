import { IsNotEmpty, IsEmail, IsString, IsIn, IsOptional } from 'class-validator';
import { Service } from "typedi";

@Service()
class UpdateUser {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string

    @IsOptional()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email?: string

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['firstName', 'lastName', 'email']
    }
}

export default UpdateUser