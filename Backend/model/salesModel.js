export const saleModel = `
CREATE TABLE IF NOT EXISTS sales (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
  total_amount REAL NOT NULL CHECK(total_amount >= 0),
  payment_status BOOLEAN NOT NULL DEFAULT 1,
  payment_type TEXT CHECK(payment_type IN ('Cash', 'Credit Card', 'UPI')) DEFAULT 'Cash',
 discount REAL CHECK(discount >= 0 AND discount <= 100) DEFAULT 0,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`
