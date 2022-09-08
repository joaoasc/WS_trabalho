import express from 'express';
import salesController from '../controller/sales.controller.js';

const router = express.Router();

router.post('/', salesController.novoSales);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSales);
router.delete('/:id', salesController.deleteSales);
router.put('/', salesController.updateSales);


export default router;