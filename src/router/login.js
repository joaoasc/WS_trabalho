import express from 'express';
import loginController from '../controller/login.controller.js';

const router = express.Router();

router.post('/', loginController.login);

export default router;