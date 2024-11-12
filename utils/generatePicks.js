// utils/generatePicks.js

export function generateRandomPicks(games) {
  return games.map((game) => {
    // Determine the current winner based on the `winner` field
    const currentWinner = game.winner === 1 ? game.homeTeamName : game.awayTeamName;

    // Decide whether to keep the current winner based on confidence
    const shouldKeepCurrentWinner = Math.random() < game.confidence / 100;

    // Predict a winner based on confidence level and current winner
    const predictedWinner = shouldKeepCurrentWinner
      ? currentWinner
      : currentWinner === game.homeTeamName
      ? game.awayTeamName
      : game.homeTeamName;

    const predictedWinnerIsHome = predictedWinner === game.homeTeamName;

    // Randomly determine underOver with confidence level affecting toggling
    let underOver;
    if (Math.random() < game.confidence / 100) {
      // Higher confidence means keeping the current state or selecting a neutral state
      underOver = game.underOver === 1 ? 1 : game.underOver === 0 ? 0 : 2;
    } else {
      // Lower confidence means more likely to toggle randomly among 0, 1, or 2
      underOver = Math.floor(Math.random() * 3);
    }

    // Randomly determine winspread with confidence level affecting toggling
    let winspread;
    if (Math.random() < game.confidence / 100) {
      // Higher confidence means keeping the current state or selecting a neutral state
      winspread = game.winspread === 1 ? 1 : game.winspread === 0 ? 0 : 2;
    } else {
      // Lower confidence means more likely to toggle randomly among 0, 1, or 2
      winspread = Math.floor(Math.random() * 3);
    }

    // Decide winner based on confidence
    const updatedWinner = shouldKeepCurrentWinner ? (predictedWinnerIsHome ? 1 : 0) : 2;

    return {
      gameId: game.gameId,
      week: game.week,
      homeTeam: game.homeTeamName,
      awayTeam: game.awayTeamName,
      predictedWinner,
      winner: updatedWinner,
      underOver: underOver === 1 ? 'OVER' : underOver === 0 ? 'UNDER' : '---',
      winspread,
    };
  });
}
