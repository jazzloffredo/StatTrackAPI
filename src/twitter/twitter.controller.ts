import { Controller, Get, Param } from '@nestjs/common';

import { TwitterService } from './twitter.service';
import { Tweet } from '../twitter/interfaces/tweet.interface';

@Controller('twitter')
export class TwitterController {

    constructor(private readonly twitterService: TwitterService) { }

    @Get('retrieveTweetsForName/:name')
    async retrieveTweetsForName(@Param() params): Promise<Tweet[]> {
        return this.twitterService.retrieveTweetsForName(params.name);
    }
}
