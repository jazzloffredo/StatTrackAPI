export interface TeamSeason {
    year: number;
    league: string;
    wins: number;
    losses: number;
    winLossRatio: number;
    yearRank: number;
    wsWinner: string;
    runsScored: number;
    runsAgainst: number;
    hittingStats: string;
    fieldingPercentage: number;
    hitsAllowed: number;
    errors: number;
    homeAttendance: number;
}
