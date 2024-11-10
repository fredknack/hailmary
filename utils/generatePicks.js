// utils/generatePicks.js

export function generateRandomPicks(games) {
  return games.map((game) => {
    const currentWinner = game.winner === 1 ? game.homeTeamName : game.awayTeamName;

    const shouldKeepCurrentWinner = Math.random() < game.confidence / 100;

    const predictedWinner = shouldKeepCurrentWinner
      ? currentWinner
      : currentWinner === game.homeTeamName
      ? game.awayTeamName
      : game.homeTeamName;

    const predictedWinnerIsHome = predictedWinner === game.homeTeamName;

    const randomUnderOver = Math.random() < 0.5 ? 1 : 0;

    const updatedWinner = Math.random() < game.confidence / 100 ? (predictedWinnerIsHome ? 1 : 0) : 2;

    const winspread = updatedWinner === 2 ? 1 : 0;

    return {
      gameId: game.gameId,
      week: game.week,
      homeTeam: game.homeTeamName,
      awayTeam: game.awayTeamName,
      predictedWinner,
      winner: updatedWinner,
      underOver: randomUnderOver === 1 ? 'OVER' : 'UNDER',
      winspread,
    };
  });
}
