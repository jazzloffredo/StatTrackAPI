import { Controller, Get, Param, Logger } from '@nestjs/common';

import { TeamService } from './team.service';
import { Team } from './interfaces/team.interface';

@Controller('team')
export class TeamController {

    constructor(private readonly teamService: TeamService) {}

    @Get('retrieveAllTeams')
    async retrieveAllTeams(): Promise<Team[]> {
        return await this.teamService.retrieveAllTeams();
    }

    @Get('retrieveFavoriteTeams/:username')
    async retrieveFavorteTeamsForUser(@Param() params): Promise<string[]> {
        return await this.teamService.retrieveFavorteTimesForUser(params.username);
    }
}
