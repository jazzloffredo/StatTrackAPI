import { Controller, Get, Param, Logger, Post, Body } from '@nestjs/common';

import { TeamService } from './team.service';
import { Team } from './interfaces/team.interface';
import { TeamSeason } from './interfaces/team-season.interface';
import { UserFavoriteTeamDTO } from './dto/user-favorite-team.dto';

@Controller('team')
export class TeamController {

    constructor(private readonly teamService: TeamService) {}

    @Get('retrieveAllTeams')
    async retrieveAllTeams(): Promise<Team[]> {
        return await this.teamService.retrieveAllTeams();
    }

    @Get('retrieveAllTeamSeasons/:teamID')
    async retrieveAllTeamSeasons(@Param() params): Promise<TeamSeason[]> {
        return await this.teamService.retrieveAllTeamSeasons(params.teamID);
    }

    @Get('retrieveFavoriteTeams/:username')
    async retrieveFavorteTeamsForUser(@Param() params): Promise<string[]> {
        return await this.teamService.retrieveFavorteTimesForUser(params.username);
    }

    @Post('addFavoriteTeamForUser')
    async addFavoriteTeamForUser(@Body() userFavTeam: UserFavoriteTeamDTO): Promise<boolean> {
        return await this.teamService.addFavoriteTeamForUser(userFavTeam);
    }

    @Post('deleteFavoriteTeamForUser')
    async deleteFavoriteTeamForuser(@Body() userFavTeam: UserFavoriteTeamDTO): Promise<boolean> {
        return await this.teamService.deleteFavoriteTeamForUser(userFavTeam);
    }
}
