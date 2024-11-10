// components/GeneratedPicks.js
export default function GeneratedPicks({ generatedPicks }) {
    if (!generatedPicks.length) return null;
  
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Generated Picks</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Week</th>
              <th className="py-2 px-4 border-b">Home Team</th>
              <th className="py-2 px-4 border-b">Away Team</th>
              <th className="py-2 px-4 border-b">Predicted Winner</th>
              <th className="py-2 px-4 border-b">Over Under</th>
              <th className="py-2 px-4 border-b">Spread</th>
            </tr>
          </thead>
          <tbody>
            {generatedPicks.map((pick, index) => (
              <tr key={index}>
                <td>{pick.week}</td>
                <td>{pick.homeTeam}</td>
                <td>{pick.awayTeam}</td>
                <td>{pick.predictedWinner}</td>
                <td>{pick.underOver}</td>
                <td>{pick.winspread === 1 ? 'Beat the spread' : 'No spread'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  