// app/teams/page.js
"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function TeamsPage() {
  const [groupedTeams, setGroupedTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('/api/teams');
        const teams = await response.json();

        const grouped = teams.reduce((acc, team) => {
          const { conference, division } = team;
          acc[conference] = acc[conference] || {};
          acc[conference][division] = acc[conference][division] || [];
          acc[conference][division].push(team);
          acc[conference][division].sort((a, b) => b.wins - a.wins);
          return acc;
        }, {});

        setGroupedTeams(grouped);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Teams</h1>
        {groupedTeams && Object.entries(groupedTeams).map(([conference, divisions]) => (
          <div key={conference} className="mb-8">
            <div className="text-2xl font-bold bg-gray-200 py-2 px-4">{conference} Conference</div>
            <table className="min-w-full bg-white">
              {Object.entries(divisions).map(([division, teams]) => (
                <tbody key={division}>
                  <tr>
                    <td colSpan="6" className="text-xl font-semibold bg-gray-300 py-2 px-4">
                      {division}
                    </td>
                  </tr>
                  {teams.map((team) => (
                    <tr key={team.teamId}>
                      <td className="py-2 px-4 border-b text-center">{team.teamId}</td>
                      <td className="py-2 px-4 border-b">{team.name}</td>
                      <td className="py-2 px-4 border-b text-center">{team.losses}</td>
                      <td className="py-2 px-4 border-b text-center">{team.wins}</td>
                      <td className="py-2 px-4 border-b text-center">{team.favored ? 'Yes' : 'No'}</td>
                      <td className="py-2 px-4 border-b text-center">{team.exclude ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        ))}
      </main>
    </div>
  );
}
