import db from '../config/db.js';

export const createSupplier = (req, res) => {
  const { name, phone, address, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Supplier name is required' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO suppliers (name, phone, address, description)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, phone || null, address || null, description || null);

    res.status(201).json({ message: 'Supplier created', supplier_id: result.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create supplier' });
  }
};

export const getAllSuppliers = (req, res) => {
  try {
    const suppliers = db.prepare(`SELECT * FROM suppliers ORDER BY created_at DESC`).all();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

export const getSupplierById = (req, res) => {
  const { id } = req.params;

  try {
    const supplier = db.prepare(`SELECT * FROM suppliers WHERE id = ?`).get(id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
};

export const updateSupplier = (req, res) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;

  try {
    const existing = db.prepare(`SELECT * FROM suppliers WHERE id = ?`).get(id);
    if (!existing) return res.status(404).json({ error: 'Supplier not found' });

    db.prepare(`
      UPDATE suppliers
      SET name = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name || existing.name, phone || existing.phone, address || existing.address, id);

    res.json({ message: 'Supplier updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update supplier' });
  }
};

export const deleteSupplier = (req, res) => {
  const { id } = req.params;

  try {
    // Check if supplier is used in any purchase
    const linked = db.prepare(`SELECT id FROM purchase WHERE supplier_id = ? LIMIT 1`).get(id);
    if (linked) {
      return res.status(400).json({ error: 'Cannot delete supplier linked to purchases' });
    }

    db.prepare(`DELETE FROM suppliers WHERE id = ?`).run(id);
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
};