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
              <td className="py-2 px-4 border-b text-center">{pick.week}</td>
              <td className="py-2 px-4 border-b text-center">{pick.homeTeam}</td>
              <td className="py-2 px-4 border-b text-center">{pick.awayTeam}</td>

              {/* Predicted Winner */}
              <td
                className={`py-2 px-4 border-b text-center ${
                  pick.predictedWinner === pick.homeTeam ? 'bg-blue-200' : 'bg-yellow-200'
                }`}
              >
                {pick.predictedWinner}
              </td>

              {/* Over Under */}
              <td
                className={`py-2 px-4 border-b text-center ${
                  pick.underOver === 'OVER' ? 'bg-green-200' :
                  pick.underOver === 'UNDER' ? 'bg-red-200' : ''
                }`}
              >
                {pick.underOver}
              </td>

              {/* Spread */}
              <td
                className={`py-2 px-4 border-b text-center ${
                  pick.winspread === 0 ? 'bg-yellow-200' :
                  pick.winspread === 1 ? 'bg-orange-200' : ''
                }`}
              >
                {pick.winspread === 0 ? 'AWAY SPREAD' :
                 pick.winspread === 1 ? 'HOME SPREAD' : '---'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
