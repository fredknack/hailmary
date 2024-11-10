// Handle team selection (home/away)
async function handleTeamClick(gameId, isHomeTeam) {
    const winner = isHomeTeam ? 1 : 0; // Set winner based on the selected team
    console.log(`Sending winner ${winner} for gameId ${gameId}`);  // Log for debugging
  
    try {
      const response = await fetch('/api/games/update-winner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId, winner }), // Send gameId and winner
      });
  
      if (response.ok) {
        const updatedGame = await response.json();
        console.log("Updated game data:", updatedGame);  // Log updated game response
  
        setGames((prevGames) =>
          prevGames.map((game) =>
            game.gameId === gameId
              ? { ...game, winner: updatedGame.winner }
              : game
          )
        );
      } else {
        console.error("Failed to update winner");
      }
    } catch (error) {
      console.error("Error updating winner:", error);
    }
  }
  
  
  
  
  // Handle Over/Under toggle
  export async function handleUnderOverClick(gameId, currentValue, setGames) {
    const newUnderOver = currentValue === 1 ? 0 : 1; // Toggle between 1 (OVER) and 0 (UNDER)
    try {
      const response = await fetch('/api/games/update-underover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, underover: newUnderOver }),
      });
  
      if (response.ok) {
        const updatedGame = await response.json();
        console.log('Updated game with under/over:', updatedGame); // Logging to confirm the under/over update
        setGames(prevGames =>
          prevGames.map(game =>
            game.gameId === gameId ? { ...game, underover: updatedGame.underover } : game
          )
        );
      } else {
        console.error('Failed to update under/over');
      }
    } catch (error) {
      console.error('Error updating under/over:', error);
    }
  }
  
  // Handle Spread toggle
  export async function handleSpreadClick(gameId, currentValue, setGames) {
    const newWinspread = currentValue === 1 ? 0 : 1; // Toggle between 1 and 0
    
    try {
      const response = await fetch('/api/games/update-winspread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, winspread: newWinspread }),
      });
  
      if (response.ok) {
        const updatedGame = await response.json();
        console.log('Updated winspread for game:', updatedGame); // Log the updated game object
        setGames(prevGames =>
          prevGames.map(game =>
            game.gameId === gameId ? { ...game, winspread: updatedGame.winspread } : game
          )
        );
      } else {
        console.error('Failed to update winspread');
      }
    } catch (error) {
      console.error('Error updating winspread:', error);
    }
  }
  
  // Handle confidence click
  export function handleConfidenceClick(gameId, confidence, setSelectedGameId, setCurrentConfidence, setIsModalOpen) {
    setSelectedGameId(gameId);
    setCurrentConfidence(confidence);
    setIsModalOpen(true);
  }
  