import { connect } from './connection.js';

async function insertPokemon(poke) {
    const conn = await connect();
    try {
        const sql = 'INSERT INTO pokemons(poke_cod, apelido) VALUES ($1,$2) RETURNING *';
        const values = [poke.cod, poke.apelido];
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
        const res = await conn.query('SELECT * FROM pokemons ORDER BY poke_id');
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
        const res = await conn.query('SELECT * FROM pokemons WHERE poke_id = $1', [id]);
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
                    'SET apelido = $1 ' +
                    'WHERE poke_id = $2 RETURNING *';
        const values = [poke.apelido, poke.poke_id];
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
        await conn.query('DELETE FROM pokemons WHERE poke_id = $1', [id]);
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