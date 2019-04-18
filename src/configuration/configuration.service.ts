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
}
