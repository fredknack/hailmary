// /pages/api/games/update-underover.js

import db from '@/db/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gameId, underover } = req.body;

  try {
    const statement = db.prepare(`
      UPDATE season_schedule 
      SET underover = ? 
      WHERE gameId = ?
    `);

    const result = statement.run(underover, gameId);
    console.log("Database update result:", result); // Log the update result

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Game not found or no changes made' });
    }

    // Fetch the updated record to return it
    const updatedGame = db.prepare(`SELECT * FROM season_schedule WHERE gameId = ?`).get(gameId);
    console.log("Updated game after setting underover:", updatedGame);

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error updating underover:", error);
    res.status(500).json({ error: "Failed to update underover" });
  }
}
