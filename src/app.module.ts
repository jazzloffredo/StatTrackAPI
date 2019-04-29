import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { PlayerService } from './player/player.service';
import { PlayerController } from './player/player.controller';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { TwitterController } from './twitter/twitter.controller';
import { TwitterService } from './twitter/twitter.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [AppController, AuthController, TeamController, PlayerController, LeaderboardController, TwitterController],
  providers: [AppService, AuthService, TeamService, PlayerService, LeaderboardService, TwitterService],
})

export class AppModule {}
