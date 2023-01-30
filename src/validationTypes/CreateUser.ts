import { IsNotEmpty, IsEmail, IsString, IsIn } from 'class-validator';
import { Service } from "typedi";
import { uid } from 'uid';

@Service()
class CreateUser {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    readonly verifyToken: string = uid(32)

    readonly createdAt: number = Date.now()

    readonly updatedAt: number = Date.now()

    static pickedProps(): string[] {
        return ['firstName', 'lastName', 'email', 'password']
    }
}

export default CreateUser