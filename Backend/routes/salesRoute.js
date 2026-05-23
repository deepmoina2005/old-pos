import express from 'express';
import * as salesController from '../controllers/salesController.js';

const router = express.Router();

router.post('/', salesController.createSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

export default router;
