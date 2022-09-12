import express from 'express';
import clientController from '../controller/client.controller.js';
import jwt from 'jsonwebtoken';

const SECRET = 'ws_project';
const router = express.Router();

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, ( err, decoded )=>{
        if(err) return res.status(401).send('nao autorizado');

        req.userId = decoded.userId;
        req.userClass = decoded.userClass;
        next() 
    }); 
}

router.post('/', verifyJWT, clientController.novoClient);
router.get('/', verifyJWT,clientController.getClients);
router.get('/:id', verifyJWT,clientController.getClient);
router.delete('/:id', verifyJWT,clientController.deleteClient);
router.put('/', verifyJWT,clientController.updateClient);


export default router;