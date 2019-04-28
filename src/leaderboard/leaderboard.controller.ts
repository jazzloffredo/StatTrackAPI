import { Controller, Get } from '@nestjs/common';

import { LeaderboardService } from './leaderboard.service';
import { LeaderboardPlayer } from './interfaces/leaderboard-player.interface';

@Controller('leaderboard')
export class LeaderboardController {

    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get('retrieveSmallestPlayers')
    async retrieveSmallestPlayers(): Promise<LeaderboardPlayer[]> {
        return this.leaderboardService.retrieveSmallestPlayers();
    }

    @Get('retrieveLargestPlayers')
    async retrieveLargestPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveLargestPlayers();
    }

    @Get('retrieveShortestPlayers')
    async retrieveShortestPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveShortestPlayers();
    }

    @Get('retrieveTallestPlayers')
    async retrieveTallestPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveTallestPlayers();
    }

    @Get('retrieveHBPPlayers')
    async retrieveHBPPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveHBPPlayers();
    }

    @Get('retrieveWildPlayers')
    async retrieveWildPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveWildPlayers();
    }

    @Get('retrieveStrikeoutsPlayers')
    async retrieveStrikeoutsPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveStrikeoutsPlayers();
    }

    @Get('retrieveBasesPlayers')
    async retrieveBasesPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveBasesPlayers();
    }

    @Get('retrieveHomerunsPlayers')
    async retrieveHomerunsPlayers(): Promise<LeaderboardPlayer[]> {
        return await this.leaderboardService.retrieveHomerunsPlayers();
    }
}
