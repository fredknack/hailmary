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

  const handleTeamClickLocal = (gameId, isHomeTeam) => {
    handleTeamClick(gameId, isHomeTeam);
    // When a team is clicked, ensure that the updated state is reflected
    setGames(prevGames =>
      prevGames.map(game =>
        game.gameId === gameId
          ? { ...game, winner: isHomeTeam ? 1 : 0 } // Correctly set the winner (1 for home, 0 for away)
          : { ...game, winner: null } // Clear any previous winner if the game is not the one being clicked
      )
    );
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Week</th>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Home Team</th>
          <th className="py-2 px-4 border-b">Away Team</th>
          <th className="py-2 px-4 border-b">Over Under</th>
          <th className="py-2 px-4 border-b">Confidence</th>
          <th className="py-2 px-4 border-b">Spread</th>
        </tr>
      </thead>

      {games.map((game) => (
        <tbody key={`tbody-${game.gameId}`}>
          <tr>
            <td className="py-2 px-4 border-b text-center">{game.week}</td>
            <td className="py-2 px-4 border-b text-center">{game.gameDate}</td>

            {/* Home Team */}
            <td
              className={`py-2 px-4 border-b text-center cursor-pointer text-blue-500 hover:underline ${game.winner === 1 ? 'bg-blue-200' : ''}`}
              onClick={() => handleTeamClickLocal(game.gameId, true)} // Click to select home team winner
            >
              <div>{game.homeTeamName}</div>
              <br />
              <span className="text-sm text-gray-500">
                ({game.homeTeamWins} - {game.homeTeamLosses})
              </span>
            </td>

            {/* Away Team */}
            <td
              className={`py-2 px-4 border-b text-center cursor-pointer text-blue-500 hover:underline ${game.winner === 0 ? 'bg-blue-200' : ''}`}
              onClick={() => handleTeamClickLocal(game.gameId, false)} // Click to select away team winner
            >
              <div>{game.awayTeamName}</div>
              <br />
              <span className="text-sm text-gray-500">
                ({game.awayTeamWins} - {game.awayTeamLosses})
              </span>
            </td>

            {/* Over Under */}
            <td
              className={`py-2 px-4 border-b text-center cursor-pointer ${game.underover === 0 ? 'bg-red-200' : game.underover === 1 ? 'bg-green-200' : ''}`}
              onClick={() => handleUnderOverClick(game.gameId, game.underover, setGames)}
            >
              {game.underover === 0 ? 'UNDER' : game.underover === 1 ? 'OVER' : '---'}
            </td>

            {/* Confidence */}
            <td
              className="py-2 px-4 border-b text-center cursor-pointer text-blue-500 hover:underline"
              onClick={() =>
                handleConfidenceClick(game.gameId, game.confidence, setSelectedGameId, setCurrentConfidence, setIsModalOpen)
              }
            >
              {game.confidence ?? 'N/A'}
            </td>

            {/* Spread */}
            <td className="py-2 px-4 border-b text-center">
              <button
                onClick={() => {
                  console.log('Clicked spread button for gameId:', game.gameId);
                  handleSpreadClick(game.gameId, game.winspread, setGames);
                }}
                className="your-button-classes"
              >
                Toggle Spread
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
