// pages/api/games/update-winner.js
import db from '@/db/db';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gameId, winner } = req.body;

    if (winner !== 0 && winner !== 1) {
      return res.status(400).json({ message: 'Invalid winner value' });
    }

    try {
      // Update the winner in the correct table ('season_schedule')
      const updatedGame = await updateGameWinner(gameId, winner);

      // Return the updated game data
      res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error updating winner in database:", error);
      res.status(500).json({ message: 'Failed to update winner', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Example of the DB update function (adjust it based on your database)
async function updateGameWinner(gameId, winner) {
  try {
    const result = await db.prepare('UPDATE season_schedule SET winner = ? WHERE gameId = ? RETURNING *').run(winner, gameId);
    return result;
  } catch (error) {
    console.error('Error during database update:', error);
    throw error;  // This will be caught by the catch block in the handler
  }
}
