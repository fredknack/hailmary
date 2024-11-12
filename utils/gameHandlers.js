// Handle team selection (home/away)
export async function handleTeamClick(gameId, isHomeTeam) {
  const winner = isHomeTeam ? 1 : 0;
  console.log(`Sending gameId ${gameId} and winner ${winner} to API`); // Verify gameId and winner

  try {
    const response = await fetch('/api/games/update-winner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, winner }),
    });
    
    if (response.ok) {
      const updatedGame = await response.json();
      console.log("Updated game response from API:", updatedGame);
      return updatedGame;
    } else {
      console.error("Failed to update winner:", await response.text());
      return null;
    }
  } catch (error) {
    console.error("Error updating winner:", error);
    return null;
  }
}
 
// Handle Over/Under toggle
export async function handleUnderOverClick(gameId, currentUnderOver, setGames) {
  // Toggle underover value in the sequence 0 -> 1 -> 2 -> 0
  const newUnderOver = currentUnderOver === 0 ? 1 : currentUnderOver === 1 ? 2 : 0;

  console.log(`Toggling underover for gameId ${gameId}: ${currentUnderOver} -> ${newUnderOver}`);

  try {
    const response = await fetch('/api/games/update-underover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, underover: newUnderOver }),
    });

    if (response.ok) {
      const updatedGame = await response.json();
      console.log("Updated underover for game:", updatedGame);

      // Update games state with the new underover value only
      setGames(prevGames =>
        prevGames.map(game =>
          game.gameId === gameId ? { ...game, underover: updatedGame.underover } : game
        )
      );
    } else {
      console.error("Failed to update underover:", await response.text());
    }
  } catch (error) {
    console.error("Error updating underover:", error);
  }
}
  
// Handle Spread toggle
export async function handleSpreadClick(gameId, currentWinspread, setGames) {
  // Toggle winspread value in the order 0 -> 1 -> 2 -> 0
  const newWinspread = currentWinspread === 0 ? 1 : currentWinspread === 1 ? 2 : 0;

  try {
    const response = await fetch('/api/games/update-winspread', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, winspread: newWinspread }),
    });

    if (response.ok) {
      const updatedGame = await response.json();
      console.log('Updated winspread for game:', updatedGame); // Log the updated game object

      // Update the games state to reflect the new winspread
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

// Handle setting confidence
export function handleConfidenceClick(gameId, confidence, setSelectedGameId, setCurrentConfidence, setIsModalOpen) {
  setSelectedGameId(gameId);
  setCurrentConfidence(confidence);
  setIsModalOpen(true);
}

// Handle confidence submit - Save the new confidence value
export async function handleConfidenceSubmit(selectedGameId, currentConfidence, setGames, setIsModalOpen) {
  try {
    const response = await fetch('/api/games/update-confidence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId: selectedGameId, confidence: currentConfidence }),
    });

    if (response.ok) {
      const updatedGame = await response.json();
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.gameId === selectedGameId ? { ...game, confidence: updatedGame.confidence } : game
        )
      );
      setIsModalOpen(false); // Close the modal after submitting
    } else {
      console.error("Failed to update confidence");
    }
  } catch (error) {
    console.error("Error updating confidence:", error);
  }
}
  