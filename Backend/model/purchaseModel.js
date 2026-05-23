export const purchaseModel = `CREATE TABLE IF NOT EXISTS purchase(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_id INTEGER NOT NULL,
  total_amount REAL NOT NULL CHECK(total_amount >= 0),
  invoice_number TEXT,
  purchase_date DATETIME NOT NULL,
  payment_status TEXT CHECK(payment_status IN ('paid', 'pending')) DEFAULT 'pending',
  payment_type TEXT CHECK(payment_type IN ('Cash', 'Credit Card', 'UPI')) DEFAULT 'Cash',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id));`