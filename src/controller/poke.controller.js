import pokemonService from '../service/pokemon.service.js';
import fetch from "node-fetch";

async function novoPokemon(req, res, next) {
    try {
        let poke = req.body;
        if (!poke.cod || !poke.apelido) {
            throw new Error('todas as informacoes sao necessárias para cadastrar o pokemon')
        }
        poke = await pokemonService.novoPokemon(poke);
        res.send(poke);
        logger.info(`POST /pokemon - ${JSON.stringify(poke)}`);
    } catch (error) {
        next(error)
    }
}

async function getPokemons(req, res, next) {
    try {
        res.send(await pokemonService.getPokemons())
        logger.info(`GET /pokemon`);
    } catch (error) {
        next(error)
    }
}

async function getPokemon(req, res, next) {
    try {
        let poke = await pokemonService.getPokemon(req.params.id)         
        
        //uso da API pokemon
        let pokeApiData = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.poke_cod}`, {method: 'GET'});
        pokeApiData = await pokeApiData.json();
        poke.id = pokeApiData.id;
        poke.name = pokeApiData.name;
        poke.img = pokeApiData.sprites.front_default;
        poke.types = pokeApiData.types.map(item => item.type.name).toString();
        
        res.send(poke);
        logger.info(`GET /pokemon:id`);
    } catch (error) {
        next(error)
    }
}

async function deletePokemon(req, res, next) {
    try {
        await pokemonService.deletePokemon(req.params.id);
        res.end();
        logger.info(`DELETE /pokemon/${req.params.id} `)
    } catch (error) {
        next(error)
    }
}

async function updatePokemon(req, res, next) {
    try {
        let poke = req.body;
        if (!poke.apelido || !poke.poke_id) {
            throw new Error('todas as informacoes sao necessárias para atualizar o pokemon')
        }
        poke = await pokemonService.updatePokemon(poke);
        res.send(poke);
        logger.info(`PUT /pokemon - ${JSON.stringify(poke)}`);
    } catch (error) {
        next(error)
    }
}

export default {
    novoPokemon,
    getPokemons,
    getPokemon,
    deletePokemon,
    updatePokemon
}