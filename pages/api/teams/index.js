// pages/api/teams/index.js
import db from '@/db/db';

export default async function handler(req, res) {
  try {
    const teams = db.prepare(`SELECT * FROM teams`).all();
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
}
