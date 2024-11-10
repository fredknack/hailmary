// /pages/api/games/update-underover.js

import db from '@/db/db';  // Assuming you have a database setup

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

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Return the updated game data
    res.status(200).json({ gameId, underover });
  } catch (error) {
    console.error("Error updating underover:", error);
    res.status(500).json({ error: "Failed to update underover" });
  }
}
