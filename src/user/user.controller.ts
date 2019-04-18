import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UsernameExistsException } from '../exceptions/username-exists.exception';
import { EmailExistsException } from '../exceptions/email-exists.exception';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('registerUser')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() createUserDTO: CreateUserDTO) {
        /*
        const usernameExists = await this.userService.checkExistingUsername(createUserDTO.username);
        const emailExists = await this.userService.checkExistingEmail(createUserDTO.email);

        if (usernameExists) {
            throw new UsernameExistsException();
        } else if (emailExists) {
            throw new EmailExistsException();
        } else {
            this.userService.registerUser(createUserDTO);
            return createUserDTO;
        }
        */
       this.userService.registerUser(createUserDTO);
       return createUserDTO;
    }
}
