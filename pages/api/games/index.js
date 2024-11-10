import db from '@/db/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Query to fetch game details along with wins/losses for home and away teams
    const games = db.prepare(`
      SELECT 
        g.gameId, 
        g.week, 
        g.gameDate, 
        g.homeTeamId, 
        g.awayTeamId, 
        g.winner, 
        g.underover, 
        g.confidence, 
        g.homeSpread, 
        g.awaySpread,
        g.winspread,  -- Include the winspread field
        t1.name AS homeTeamName, 
        t1.wins AS homeTeamWins, 
        t1.losses AS homeTeamLosses,
        t2.name AS awayTeamName, 
        t2.wins AS awayTeamWins, 
        t2.losses AS awayTeamLosses
      FROM season_schedule g
      LEFT JOIN teams t1 ON g.homeTeamId = t1.teamId
      LEFT JOIN teams t2 ON g.awayTeamId = t2.teamId
    `).all();

    // Map games data to include winspread and other relevant information
    const gamesWithWinspread = games.map(game => ({
      ...game,
      homeTeamWins: game.homeTeamWins || 0,  // Default to 0 if undefined
      awayTeamWins: game.awayTeamWins || 0,  // Default to 0 if undefined
      winspread: game.winspread || 0,        // Default to 0 if winspread is undefined
    }));

    res.status(200).json(gamesWithWinspread);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
