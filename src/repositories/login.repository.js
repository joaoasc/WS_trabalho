import { connect } from './connection.js';

async function login(user) {

    const conn = await connect();
    try {
        const sql = 'SELECT userId, userClass FROM users WHERE userName like $1 and userPswd like $2';
        const values = [user.user, user.pswd];
        const res = await conn.query(sql, values);
        return res.rows[0];

    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
};

export default {
    login
}