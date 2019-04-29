import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { PlayerService } from './player.service';
import { Player } from './interfaces/player.interface';
import { UserFavoritePlayerDTO } from './dto/user-favorite-player.dto';
import { PlayerBattingSeason } from './interfaces/player-batting-season.interface';
import { PlayerFieldingSeason } from './interfaces/player-fielding-season.inteface';
import { PlayerPitchingSeason } from './interfaces/player-pitching-season.interface';

@Controller('player')
export class PlayerController {

    constructor(private readonly playerService: PlayerService) {}

    @Get('retrieveAllPlayersGivenChar/:lastNameChar')
    async retrieveAllPlayersGivenChar(@Param() params): Promise<Player[]> {
        return await this.playerService.retrieveAllPlayersGivenChar(params.lastNameChar);
    }

    @Get('retrievePlayerBattingSeasons/:playerID')
    async retrievePlayerBattingSeasons(@Param() params): Promise<PlayerBattingSeason[]> {
        return await this.playerService.retrievePlayerBattingSeasons(params.playerID);
    }

    @Get('retrievePlayerFieldingSeasons/:playerID')
    async retrievePlayerFieldingSeasons(@Param() params): Promise<PlayerFieldingSeason[]> {
        return await this.playerService.retrievePlayerFieldingSeasons(params.playerID);
    }

    @Get('retrievePlayerPitchingSeasons/:playerID')
    async retrievePlayerPitchingSeasons(@Param() params): Promise<PlayerPitchingSeason[]> {
        return await this.playerService.retrievePlayerPitchingSeasons(params.playerID);
    }

    @Get('retrieveFavoritePlayers/:username')
    async retrieveFavoritePlayersForUser(@Param() params): Promise<string[]> {
        return await this.playerService.retrieveFavoritePlayersForUser(params.username);
    }

    @Get('retrieveFavoritePlayerNames/:username')
    async retrieveFavoritePlayerNames(@Param() params): Promise<string[]> {
        return await this.playerService.retrieveFavoritePlayerNames(params.username);
    }

    @Get('mapPlayerIdToName/:playerID')
    async mapPlayerIdToName(@Param() params): Promise<string[]> {
        return await this.playerService.mapPlayerIdToName(params.playerID);
    }

    @Post('addFavoritePlayerForUser')
    async addFavoritePlayerForUser(@Body() userFavPlayer: UserFavoritePlayerDTO): Promise<boolean> {
        return await this.playerService.addFavoritePlayerForUser(userFavPlayer);
    }

    @Post('deleteFavoritePlayerForUser')
    async deleteFavoritePlayerForuser(@Body() userFavPlayer: UserFavoritePlayerDTO): Promise<boolean> {
        return await this.playerService.deleteFavoritePlayerForUser(userFavPlayer);
    }
}
