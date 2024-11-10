// pages/api/games/update-winner.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gameId, winner } = req.body;

    // Validate the incoming data
    if (typeof gameId !== 'number' || (winner !== 0 && winner !== 1)) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    try {
      // Example database update, adjust this for your actual DB method
      const result = await db.query(
        'UPDATE games SET winner = $1 WHERE gameId = $2 RETURNING *',
        [winner, gameId]
      );

      // If the game wasn't found or updated
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Game not found' });
      }

      const updatedGame = result.rows[0];
      res.status(200).json(updatedGame);  // Send back the updated game data
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Failed to update winner' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Handle non-POST requests
  }
}
