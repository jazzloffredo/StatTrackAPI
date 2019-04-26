import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { PlayerService } from './player.service';
import { Player } from './interfaces/player.interface';
import { UserFavoritePlayerDTO } from './dto/user-favorite-player.dto';

@Controller('player')
export class PlayerController {

    constructor(private readonly playerService: PlayerService) {}

    @Get('retrieveAllPlayers')
    async retrieveAllTeams(): Promise<Player[]> {
        return await this.playerService.retrieveAllPlayers();
    }

    @Get('retrieveFavoritePlayers/:username')
    async retrieveFavorteTeamsForUser(@Param() params): Promise<string[]> {
        return await this.playerService.retrieveFavoritePlayersForUser(params.username);
    }

    @Post('addFavoritePlayerForUser')
    async addFavoriteTeamForUser(@Body() userFavPlayer: UserFavoritePlayerDTO): Promise<boolean> {
        return await this.playerService.addFavoritePlayerForUser(userFavPlayer);
    }

    @Post('deleteFavoritePlayerForUser')
    async deleteFavoriteTeamForuser(@Body() userFavPlayer: UserFavoritePlayerDTO): Promise<boolean> {
        return await this.playerService.deleteFavoritePlayerForUser(userFavPlayer);
    }
}
