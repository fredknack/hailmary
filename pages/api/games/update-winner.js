import db from '@/db/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gameId, winner } = req.body;
  console.log("Received gameId:", gameId, "with winner:", winner); // Log incoming values

  if (winner !== 0 && winner !== 1) {
    return res.status(400).json({ error: 'Invalid winner value' });
  }

  try {
    const statement = db.prepare(`
      UPDATE season_schedule 
      SET winner = ? 
      WHERE gameId = ?
    `);

    const result = statement.run(winner, gameId);
    console.log("Database update result:", result); // Log update result

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Game not found or no changes made' });
    }

    const updatedGame = db.prepare(`SELECT * FROM season_schedule WHERE gameId = ?`).get(gameId);
    console.log('Updated game:', updatedGame);

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error updating winner:", error);
    res.status(500).json({ error: "Failed to update winner" });
  }
}
