import { Controller, Get } from '@nestjs/common';

import { TwitterService } from './twitter.service';
import { Tweet } from 'dist/twitter/interfaces/tweet.interface';

@Controller('twitter')
export class TwitterController {

    constructor(private readonly twitterService: TwitterService) { }

    @Get('test')
    async retrieveTweetsForName(name: string): Promise<Tweet[]> {
        return this.twitterService.retrieveTweetsForName(name);
    }
}
