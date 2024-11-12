"use client";  

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GameTable from '@/components/GameTable';
import GeneratedPicks from '@/components/GeneratedPicks';
import { fetchGames } from '@/services/gameService';
import { generateRandomPicks } from '@/utils/generatePicks';
import { handleSpreadClick, handleUnderOverClick, handleTeamClick, handleConfidenceClick, handleConfidenceSubmit } from '@/utils/gameHandlers';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedPicks, setGeneratedPicks] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [currentConfidence, setCurrentConfidence] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch games data on page load
  useEffect(() => {
    async function loadGames() {
      const gamesData = await fetchGames();
      setGames(gamesData);
      setLoading(false);
    }
    loadGames();
  }, []);

  // Handle generating picks for the games
  function handleGeneratePicks() {
    const picks = generateRandomPicks(games);
    setGeneratedPicks(picks);
  }

  if (loading) return <p>Loading games...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Season Schedule</h1>
          <button
            onClick={handleGeneratePicks}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Picks
          </button>
        </div>

        <GameTable
          games={games}
          setGames={setGames}
          handleTeamClick={handleTeamClick}
          handleUnderOverClick={handleUnderOverClick}
          handleSpreadClick={handleSpreadClick}
          handleConfidenceClick={(gameId, confidence) => handleConfidenceClick(gameId, confidence, setSelectedGameId, setCurrentConfidence, setIsModalOpen)}
          setSelectedGameId={setSelectedGameId}
          setCurrentConfidence={setCurrentConfidence}
          setIsModalOpen={setIsModalOpen}
        />
        <GeneratedPicks generatedPicks={generatedPicks} />
      </main>

      {/* Confidence Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Set Confidence Level</h2>
            <div className="mb-4 text-center text-2xl font-semibold">{currentConfidence}</div>
            <input
              type="range"
              min="1"
              max="100"
              value={currentConfidence}
              onChange={(e) => setCurrentConfidence(e.target.value)}
              className="w-full mb-4"
            />
            <button
              onClick={() => handleConfidenceSubmit(selectedGameId, currentConfidence, setGames, setIsModalOpen)}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
