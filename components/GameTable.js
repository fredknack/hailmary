import React from 'react';

export default function GameTable({
  games,
  setGames,
  handleTeamClick,
  handleUnderOverClick,
  handleSpreadClick,
  handleConfidenceClick,
  setSelectedGameId,
  setCurrentConfidence,
  setIsModalOpen,
}) {
  const handleTeamClickLocal = async (gameId, isHomeTeam) => {
    console.log("Clicked gameId:", gameId);

    const updatedGame = await handleTeamClick(gameId, isHomeTeam);

    if (!updatedGame) {
      console.error("Updated game is null or undefined");
      return;
    }

    setGames(prevGames =>
      prevGames.map(game =>
        game.gameId === gameId ? { ...game, winner: updatedGame.winner } : game
      )
    );
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-1 px-2 border-b">Week</th>
          <th className="py-1 px-2 border-b">Date</th>
          <th className="py-1 px-2 border-b">Home Team</th>
          <th className="py-1 px-2 border-b">Away Team</th>
          <th className="py-1 px-2 border-b">Over Under</th>
          <th className="py-1 px-2 border-b">Confidence</th>
          <th className="py-1 px-2 border-b">Spread</th>
        </tr>
      </thead>

      {games.map((game) => (
        <tbody key={`tbody-${game.gameId}`}>
          <tr>
            <td className="py-1 px-2 border-b text-center">{game.week}</td>
            <td className="py-1 px-2 border-b text-center">{game.gameDate}</td>

            {/* Home Team */}
            <td
              className={`py-1 px-2 border-b text-center cursor-pointer text-blue-500 hover:underline ${game.winner === 1 ? 'bg-blue-200' : ''}`}
              onClick={() => handleTeamClickLocal(game.gameId, true)}
            >
              <div>{game.homeTeamName}</div>
              <span className="text-sm text-gray-500">
                ({game.homeTeamWins} - {game.homeTeamLosses})
              </span>
            </td>

            {/* Away Team */}
            <td
              className={`py-1 px-2 border-b text-center cursor-pointer text-blue-500 hover:underline ${game.winner === 0 ? 'bg-blue-200' : ''}`}
              onClick={() => handleTeamClickLocal(game.gameId, false)}
            >
              <div>{game.awayTeamName}</div>
              <span className="text-sm text-gray-500">
                ({game.awayTeamWins} - {game.awayTeamLosses})
              </span>
            </td>

            {/* Over Under */}
            <td
              className={`py-1 px-2 border-b text-center cursor-pointer ${
                game.underover === 0 ? 'bg-red-200' : 
                game.underover === 1 ? 'bg-green-200' : ''
              }`}
              onClick={() => handleUnderOverClick(game.gameId, game.underover, setGames)}
            >
              {game.underover === 0 ? 'UNDER' : 
              game.underover === 1 ? 'OVER' : '---'}
            </td>

            {/* Confidence */}
            <td
              className="py-1 px-2 border-b text-center cursor-pointer text-blue-500 hover:underline"
              onClick={() =>
                handleConfidenceClick(game.gameId, game.confidence, setSelectedGameId, setCurrentConfidence, setIsModalOpen)
              }
            >
              {game.confidence ?? 'N/A'}
            </td>

            {/* Spread */}
            <td
              className={`py-1 px-2 border-b text-center cursor-pointer ${
                game.winspread === 0 ? 'bg-yellow-200' :
                game.winspread === 1 ? 'bg-orange-200' : ''
              }`}
              onClick={() => handleSpreadClick(game.gameId, game.winspread, setGames)}
            >
              {game.winspread === 0 ? 'AWAY SPREAD' :
               game.winspread === 1 ? 'HOME SPREAD' : '---'}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
