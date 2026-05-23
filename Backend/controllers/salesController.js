import dbPromise from '../config/db.js';

export const createSale = async (req, res) => {
  const db = await dbPromise;
  const {
    sale,
    items 
  } = req.body;

  try {
    await db.run('BEGIN TRANSACTION');

    const total_price = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
    const discount = sale.discount || 0;
    const total_amount = total_price - (total_price * discount / 100);

    const saleStmt = await db.run(`
      INSERT INTO sales (total_amount, payment_status, payment_type, discount)
      VALUES (?, ?, ?, ?)
    `, [total_amount, sale.payment_status ?? 1, sale.payment_type ?? 'Cash', discount]);

    const sale_id = saleStmt.lastID;

    for (const item of items) {
      const total_item_price = item.unit_price * item.quantity;

      await db.run(`
        INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?)
      `, [sale_id, item.product_id, item.quantity, item.unit_price, total_item_price]);
    }

    await db.run('COMMIT');
    res.status(201).json({ message: 'Sale created', sale_id });

  } catch (err) {
    await db.run('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to create sale' });
  }
};

export const getAllSales = async (req, res) => {
  const db = await dbPromise;
  try {
    const sales = await db.all(`SELECT * FROM sales ORDER BY created_at DESC`);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sales' });
  }
};

export const getSaleById = async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;

  try {
    const sale = await db.get(`SELECT * FROM sales WHERE id = ?`, [id]);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });

    const items = await db.all(`SELECT * FROM sale_items WHERE sale_id = ?`, [id]);

    res.json({ ...sale, items });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sale' });
  }
};

export const updateSale = async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;
  const { payment_status, payment_type, discount } = req.body;

  try {
    const sale = await db.get(`SELECT * FROM sales WHERE id = ?`, [id]);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });

    await db.run(`
      UPDATE sales
      SET payment_status = ?, payment_type = ?, discount = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [payment_status ?? sale.payment_status, payment_type ?? sale.payment_type, discount ?? sale.discount, id]);

    res.json({ message: 'Sale updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating sale' });
  }
};

export const deleteSale = async (req, res) => {
  const db = await dbPromise;
  const { id } = req.params;

  try {
    await db.run(`DELETE FROM sales WHERE id = ?`, [id]);
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting sale' });
  }
};
