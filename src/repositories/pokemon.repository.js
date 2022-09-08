import { connect } from './connection.js';

async function insertPokemon(poke) {
    const conn = await connect();
    try {
        const sql = 'INSERT INTO pokemons(nome, tipo, sexo, apelido, tamanho) VALUES ($1,$2,$3,$4,$5) RETURNING *';
        const values = [poke.nome, poke.tipo, poke.sexo, poke.apelido, poke.tamanho];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        //fecha a conexao
        conn.release();
    }
};

async function getPokemons() {
    const conn = await connect();
    try {
        const res = await conn.query('SELECT * FROM pokemons');
        return res.rows;
    } catch (error) {
        throw error;
    } finally {
        //fecha a conexao
        conn.release();
    }
}

async function getPokemon(id) {
    const conn = await connect();
    try {
        const res = await conn.query('SELECT * FROM pokemons WHERE pokemon_id = $1', [id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        //fecha a conexao
        conn.release();
    }
}

async function updatePokemon(poke) {
    const conn = await connect();
    try {
        const sql = 'UPDATE pokemons ' +
            'SET nome = $1, tipo = $2, sexo = $3, apelido = $4, tamanho = $5 ' +
            'WHERE pokemon_id = $6 RETURNING *';
        const values = [poke.nome, poke.tipo, poke.sexo, poke.apelido, poke.tamanho, poke.pokemon_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        //fecha a conexao
        conn.release();
    }
}

async function deletePokemon(id) {
    const conn = await connect();
    try {
        await conn.query('DELETE FROM pokemons WHERE pokemon_id = $1', [id]);
    } catch (error) {
        throw error;
    } finally {
        //fecha a conexao
        conn.release();
    }
}

export default {
    insertPokemon,
    getPokemons,
    getPokemon,
    updatePokemon,
    deletePokemon,
}