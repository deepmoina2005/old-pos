import db from '../config/db.js';

export const createPurchase = (req, res) => {
  const { supplier_id, invoice_number, purchase_date, payment_status, payment_type, items } = req.body;

  try {
    const insertPurchase = db.prepare(`
      INSERT INTO purchase (supplier_id, total_amount, invoice_number, purchase_date, payment_status, payment_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertItem = db.prepare(`
      INSERT INTO purchase_order_items (purchase_id, product_id, quantity, unit_price, total_price)
      VALUES (?, ?, ?, ?, ?)
    `);

    let total_amount = 0;
    const transaction = db.transaction(() => {
      for (const item of items) {
        const { quantity, unit_price } = item;
        const total = quantity * unit_price;
        total_amount += total;
      }

      const purchaseResult = insertPurchase.run(
        supplier_id,
        total_amount,
        invoice_number || null,
        purchase_date,
        payment_status || 'pending',
        payment_type || 'Cash'
      );

      const purchase_id = purchaseResult.lastInsertRowid;

      for (const item of items) {
        const total = item.quantity * item.unit_price;
        insertItem.run(purchase_id, item.product_id, item.quantity, item.unit_price, total);
      }

      return purchase_id;
    });

    const purchase_id = transaction();
    res.status(201).json({ message: 'Purchase created', purchase_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create purchase' });
  }
};

export const getAllPurchases = (req, res) => {
  try {
    const purchases = db.prepare(`SELECT * FROM purchase ORDER BY created_at DESC`).all();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

export const getPurchaseById = (req, res) => {
  const { id } = req.params;

  try {
    const purchase = db.prepare(`SELECT * FROM purchase WHERE id = ?`).get(id);
    if (!purchase) return res.status(404).json({ error: 'Purchase not found' });

    const items = db.prepare(`SELECT * FROM purchase_order_items WHERE purchase_id = ?`).all(id);
    res.json({ ...purchase, items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchase' });
  }
};

export const updatePurchase = (req, res) => {
  const { id } = req.params;
  const { payment_status, payment_type } = req.body;

  try {
    const existing = db.prepare(`SELECT * FROM purchase WHERE id = ?`).get(id);
    if (!existing) return res.status(404).json({ error: 'Purchase not found' });

    db.prepare(`
      UPDATE purchase
      SET payment_status = ?, payment_type = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(payment_status || existing.payment_status, payment_type || existing.payment_type, id);

    res.json({ message: 'Purchase updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update purchase' });
  }
};

export const deletePurchase = (req, res) => {
  const { id } = req.params;

  try {
    db.prepare(`DELETE FROM purchase WHERE id = ?`).run(id);
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete purchase' });
  }
};
