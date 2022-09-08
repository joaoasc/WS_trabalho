import express from 'express';
import clientController from '../controller/client.controller.js';

const router = express.Router();

router.post('/', clientController.novoClient);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.delete('/:id', clientController.deleteClient);
router.put('/', clientController.updateClient);


export default router;