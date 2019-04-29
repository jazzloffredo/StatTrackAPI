import { Injectable, Logger } from '@nestjs/common';
import Twit = require('twit');

import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class TwitterService {

    constructor(private configService: ConfigurationService) { }

    async test() {
        const res = this.configService.twitterConfig;

        const client = new Twit({
            consumer_key: res.consumer_key,
            consumer_secret: res.consumer_secret,
            access_token: res.access_token_key,
            access_token_secret: res.access_token_secret,
        });

        const twitRes = await client.get('search/tweets', {q: 'banana', count: 5});

        Logger.log(twitRes);
    }

}
