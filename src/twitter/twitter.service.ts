import { Injectable, Logger } from '@nestjs/common';
import Twitter = require('twitter');

import { ConfigurationService } from '../configuration/configuration.service';
import { Tweet } from '../twitter/interfaces/tweet.interface';

@Injectable()
export class TwitterService {

    constructor(private configService: ConfigurationService) { }

    async retrieveTweetsForName(name: string): Promise<Tweet[]> {
        const res = this.configService.twitterConfig;

        const tweets: Tweet[] = [];

        const client = new Twitter({
            consumer_key: res.consumer_key,
            consumer_secret: res.consumer_secret,
            access_token_key: res.access_token_key,
            access_token_secret: res.access_token_secret,
        });

        const nameArray = name.split('-');
        let fixedName = '';
        for (const piece of nameArray) {
            fixedName += piece;
        }

        const twitRes = await client.get('search/tweets', {q: fixedName, count: 3});

        for (const status of twitRes.statuses) {
            tweets.push({
                text: status.text,
                userScreenName: status.user.screen_name,
                userRealName: status.user.name,
                profileImageUrl: status.user.profile_image_url,
                postedDate: status.created_at,
            });
        }

        return tweets;
    }
}
