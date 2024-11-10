// /pages/api/games/update-confidence.js

import db from '@/db/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gameId, confidence } = req.body;

  try {
    const statement = db.prepare(`
      UPDATE season_schedule 
      SET confidence = ? 
      WHERE gameId = ?
    `);

    const result = statement.run(confidence, gameId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Return the updated game data
    res.status(200).json({ gameId, confidence });
  } catch (error) {
    console.error("Error updating confidence:", error);
    res.status(500).json({ error: "Failed to update confidence" });
  }
}
