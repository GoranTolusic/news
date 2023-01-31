import { IsNotEmpty, IsEmail, IsString, IsIn, IsOptional } from 'class-validator';
import { Service } from "typedi";
import { uid } from 'uid';

@Service()
class CreateUser {
    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    alias: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsIn(['editor', 'guest'])
    role: string

    readonly verified: boolean = false

    readonly verifyToken: string = uid(32)

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['firstName', 'lastName', 'email', 'password', 'alias', 'role']
    }
}

export default CreateUser