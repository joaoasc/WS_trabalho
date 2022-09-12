import { connect } from './connection.js';

async function insertSales(sales) {
    const conn = await connect();
    try {
        const sql = 'INSERT INTO sales(client_id, poke_id, value) VALUES ($1,$2,$3) RETURNING *';
        const values = [sales.client_id, sales.poke_id, sales.value];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

async function getAllSales() {
    const conn = await connect();
    try {
        const res = await conn.query('SELECT * FROM sales');
        return res.rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

async function getSales(id) {
    const conn = await connect();
    try {
        const res = await conn.query('SELECT * FROM sales WHERE sale_id = $1', [id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

async function updateSales(sales) {
    const conn = await connect();
    try {
        const sql = 'UPDATE sales ' +
                    'SET client_id = $1, poke_id = $2, value = $3 ' +
                    'WHERE sale_id = $4 RETURNING *';
        const values = [sales.client_id, sales.poke_id, sales.value, sales.sale_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

async function deleteSales(id) {
    const conn = await connect();
    try {
        await conn.query('DELETE FROM sales WHERE sale_id = $1', [id]);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export default {
    insertSales,
    getAllSales,
    getSales,
    updateSales,
    deleteSales,
}