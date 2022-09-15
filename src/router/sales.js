import express from 'express';
import salesController from '../controller/sales.controller.js';

import jwt from 'jsonwebtoken';

const SECRET = 'ws_project';

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, ( err, decoded )=>{
        if(err) return res.status(401).send({"error":'nao autorizado'});

        req.userId = decoded.userId;
        req.userClass = decoded.userClass;
        next() 
    }); 
}


const router = express.Router();

router.post('/', verifyJWT, salesController.novoSales);
router.get('/', verifyJWT, salesController.getAllSales);
router.get('/:id', verifyJWT, salesController.getSales);
router.delete('/:id', verifyJWT, salesController.deleteSales);
router.put('/', verifyJWT, salesController.updateSales);


export default router;