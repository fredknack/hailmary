// pages/api/games/update-spread.js
import db from '@/db/db'; // Import your DB connection

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gameId, homeSpread, awaySpread } = req.body;
  console.log("Received request to update spread:", gameId, homeSpread, awaySpread);

  if (typeof gameId === 'undefined' || typeof homeSpread === 'undefined' || typeof awaySpread === 'undefined') {
    return res.status(400).json({ error: 'Missing gameId, homeSpread, or awaySpread in request body' });
  }

  try {
    const statement = db.prepare(`
      UPDATE season_schedule 
      SET homeSpread = ?, awaySpread = ?
      WHERE gameId = ?
    `);

    const result = statement.run(homeSpread, awaySpread, gameId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json({ gameId, homeSpread, awaySpread });
  } catch (error) {
    console.error("Failed to update spread:", error);
    res.status(500).json({ error: 'Failed to update spread' });
  }
}
