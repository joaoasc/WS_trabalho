import { connect } from './connection.js';

async function insertClient(client) {
    const conn = await connect();
    try {
        const sql = 'INSERT INTO clients(nome, endereco, cidade, sexo) VALUES ($1,$2,$3,$4) RETURNING *';
        const values = [client.nome, client.endereco, client.cidade, client.sexo];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

async function getClients() {
    const conn = await connect();
    try {
        const res = await conn.query('SELECT * FROM clients ORDER BY client_id');
        return res.rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

async function getClient(req) {
    const conn = await connect();
    try {
        const res = await conn.query('SELECT * FROM clients WHERE client_id = $1', [req.params.id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

async function updateClient(client) {
    const conn = await connect();
    try {
        const sql = 'UPDATE clients ' +
                    'SET nome = $1, endereco = $2, cidade = $3, sexo = $4 ' +
                    'WHERE client_id = $5 RETURNING *';
        const values = [client.nome, client.endereco, client.cidade, client.sexo, client.client_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

async function deleteClient(id) {
    const conn = await connect();
    try {
        await conn.query('DELETE FROM clients WHERE client_id = $1', [id]);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export default {
    insertClient,
    getClients,
    getClient,
    updateClient,
    deleteClient,
}