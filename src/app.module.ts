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
import { TwitterController } from './twitter/twitter.controller';
import { TwitterService } from './twitter/twitter.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [AppController, AuthController, TeamController, PlayerController, TwitterController],
  providers: [AppService, AuthService, TeamService, PlayerService, TwitterService],
})
export class AppModule {}
