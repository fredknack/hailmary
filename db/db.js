// db/db.js
import Database from 'better-sqlite3';
import path from 'path';

// Create a connection to the SQLite database
const dbPath = path.join(process.cwd(), 'db', 'sports.db');
const db = new Database(dbPath);

export default db;
