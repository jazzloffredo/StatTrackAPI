import { Controller, Get } from '@nestjs/common';

import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {

    constructor(private readonly twitterService: TwitterService) { }

    @Get('test')
    async testTwitterAuth() {
        this.twitterService.test();
    }
}
