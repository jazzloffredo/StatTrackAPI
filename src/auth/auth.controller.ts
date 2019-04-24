import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { UsernameExistsException } from '../exceptions/username-exists.exception';
import { EmailExistsException } from '../exceptions/email-exists.exception';
import { LoginFailedException } from '../exceptions/login-failed.exception';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('registerUser')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() createUserDTO: CreateUserDTO) {

        const usernameExists = await this.authService.checkUsernameExists(createUserDTO.username);
        const emailExists = await this.authService.checkEmailExists(createUserDTO.email);

        if (usernameExists) {
            throw new UsernameExistsException();
        }

        if (emailExists) {
            throw new EmailExistsException();
        }

        await this.authService.registerUser(createUserDTO);
        return;
    }

    @Post('attemptLogin')
    @UsePipes(new ValidationPipe())
    async attemptLogin(@Body() loginUserDTO: LoginUserDTO) {
        const validUsername = await this.authService.checkUsernameExists(loginUserDTO.username);

        if (!validUsername) {
            throw new LoginFailedException();
        }

        const loginSuccess = await this.authService.attemptLogin(loginUserDTO);

        if (!loginSuccess) {
            throw new LoginFailedException();
        }
        return;
    }
}
