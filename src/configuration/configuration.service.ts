import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    get dbConfig() {
        return  {
            server: 'stattrackdb.database.windows.net',
            database: 'StatTrack',
            user: 'api',
            password: 'e\'Rp]dH#Tn6hu`K8B]cuv(g#96_cMX!7:+/P+#:A/Y7ekgu]3U',
            port: 1433,
            options: {
                  encrypt: true,
              },
           };
    }

    get twitterConfig() {
        return {
            consumer_key: 'KZsUlQNxA4KZalZD2Pmp4FVpl',
            consumer_secret: 'uxzthnrlsNxNXplcYnwCWkrfoEJIjOEO2GHdLUglatULB2mLse',
            access_token_key: '1577698454-ko2es4PWtpdHs0CafdauLQCoKccxGSSdyzfgbWW',
            access_token_secret: '8psugjIwjDtJhW4XWJZd5HwiyhuNFqXrSfZwrKZqTnKeE',
        };
    }
}
