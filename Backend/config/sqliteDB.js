import Database from 'better-sqlite3';

const connectDB = () => {
  const db = new Database('greencart.db'); // you can specify a relative or absolute path here
  console.log('Database Connected');

  // Example of creating a table if it doesn't exist
  db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    )
  `).run();

  return db;
};

export default connectDB;
