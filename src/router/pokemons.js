import express from 'express';
import pokeController from '../controller/poke.controller.js';

const router = express.Router();

router.post('/', pokeController.novoPokemon);
router.get('/', pokeController.getPokemons);
router.get('/:id', pokeController.getPokemon);
router.delete('/:id', pokeController.deletePokemon);
router.put('/', pokeController.updatePokemon);


export default router;