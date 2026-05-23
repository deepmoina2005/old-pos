export const productModel = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_id INTEGER ,
  name TEXT NOT NULL,
  description TEXT,
  selling_price REAL NOT NULL CHECK(selling_price >= 0),
  cost_price REAL CHECK(cost_price >= 0) DEFAULT 0,
  stock INTEGER NOT NULL CHECK(stock >= 0) DEFAULT 0,
  brand TEXT,
  category_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);`
