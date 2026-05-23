import express from 'express';
import * as unitController from '../controllers/unitController.js';

const router = express.Router();

router.post('/', unitController.createUnit);
router.get('/', unitController.getAllUnits);
router.get('/:id', unitController.getUnitById);
router.put('/:id', unitController.updateUnit);
router.delete('/:id', unitController.deleteUnit);

export default router;
