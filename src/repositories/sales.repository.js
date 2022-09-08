import { connect } from './connection.js';

async function insertSales(sales) {
    const conn = await connect();
    try {
        const sql = 'INSERT INTO sales(client_id, pokemon_id, value, date) VALUES ($1,$2,$3,$4) RETURNING *';
        const values = [sales.client_id, sales.pokemon_id, sales.value, sales.date];
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
                    'SET client_id = $1, pokemon_id = $2, value = $3, date = $4 ' +
                    'WHERE sale_id = $5 RETURNING *';
        const values = [sales.client_id, sales.pokemon_id, sales.value, sales.date, sales.sale_id];
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
        await conn.query('DELETE FROM sales WHERE sales_id = $1', [id]);
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