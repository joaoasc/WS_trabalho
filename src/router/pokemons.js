import express from 'express';
import pokeController from '../controller/poke.controller.js';
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

router.post('/', verifyJWT, pokeController.novoPokemon);
router.get('/', verifyJWT, pokeController.getPokemons);
router.get('/:id', verifyJWT, pokeController.getPokemon);
router.delete('/:id', verifyJWT, pokeController.deletePokemon);
router.put('/', verifyJWT, pokeController.updatePokemon);


export default router;