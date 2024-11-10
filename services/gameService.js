// services/gameService.js
export async function fetchGames() {
    try {
      const response = await fetch('/api/games');
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch games');
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }
  
  export async function updateWinner(gameId, winner) {
    try {
      const response = await fetch('/api/games/update-winner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, winner })
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error updating winner:", error);
    }
  }
  
  export async function updateWinspread(gameId, winspread) {
    try {
      const response = await fetch('/api/games/update-winspread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, winspread })
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error updating winspread:", error);
    }
  }
  
  export async function updateUnderOver(gameId, underover) {
    try {
      const response = await fetch('/api/games/update-underover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, underover })
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error updating underover:", error);
    }
  }
  