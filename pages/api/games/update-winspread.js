import db from '@/db/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gameId, winspread } = req.body;

  try {
    // Fetch the game record to check its current state
    const game = db.prepare(`SELECT * FROM season_schedule WHERE gameId = ?`).get(gameId);
    console.log('Fetched game:', game);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Log the current winspread value before updating
    console.log(`Current winspread for gameId ${gameId}:`, game.winspread);

    // Toggle winspread (0 -> 1, 1 -> 0)
    const updatedWinspread = game.winspread === 1 ? 0 : 1;

    // If winspread is 1, set winner to 2
    let updatedWinner = updatedWinspread === 1 ? 2 : null;

    // Log the updated values before running the query
    console.log(`Toggling winspread for gameId ${gameId}:`, updatedWinspread);

    // Perform the update query
    const statement = db.prepare(`
      UPDATE season_schedule 
      SET winspread = ?, winner = ?
      WHERE gameId = ?
    `);

    const result = statement.run(updatedWinspread, updatedWinner, gameId);

    // Log the result of the update query to check for changes
    console.log('Database update result:', result);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Game not found or no changes made' });
    }

    // Fetch the updated game record to return the latest values
    const updatedGame = db.prepare(`SELECT * FROM season_schedule WHERE gameId = ?`).get(gameId);
    console.log('Updated game:', updatedGame);

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error updating winspread:", error);
    res.status(500).json({ error: "Failed to update winspread" });
  }
}
