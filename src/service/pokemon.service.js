import pokemonRepository from "../repositories/pokemon.repository.js";

async function novoPokemon(poke) {
    return await pokemonRepository.insertPokemon(poke)
};

async function getPokemons() {
    return await pokemonRepository.getPokemons()
};

async function getPokemon(id) {
    return await pokemonRepository.getPokemon(id)
};

async function deletePokemon(id) {
    await pokemonRepository.deletePokemon(id)
}

async function updatePokemon(poke) {
    return await pokemonRepository.updatePokemon(poke);
}

export default {
    novoPokemon,
    getPokemons,
    getPokemon,
    deletePokemon,
    updatePokemon
}