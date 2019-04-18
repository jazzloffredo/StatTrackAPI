import { IsString, IsEmail, IsAlpha, IsAlphanumeric } from 'class-validator';

export class CreateUserDTO {
    @IsAlpha()          readonly firstName: string;
    @IsAlpha()          readonly lastName: string;
    @IsAlphanumeric()   readonly username: string;
    @IsEmail()          readonly email: string;
                        readonly password: string;

    constructor(firstName: string, lastName: string, username: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
