import pokemonService from '../service/pokemon.service.js';

async function novoPokemon(req, res, next) {
    try {
        let poke = req.body;
        if (!poke.nome || !poke.tipo || !poke.sexo || !poke.apelido || !poke.tamanho) {
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
        res.send(await pokemonService.getPokemon(req.params.id))
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
        if (!poke.nome || !poke.tipo || !poke.sexo || !poke.apelido || !poke.tamanho || !poke.pokemon_id) {
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