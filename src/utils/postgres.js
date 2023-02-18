import pg from 'pg';
const { Pool } = pg;


import { config } from 'dotenv';
config()



const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING || "postgres://postgres:abbos@localhost:5432/telegrambot"
})

export const fetchData = async(SQL, ...params) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(SQL, params.length ? params : null);
        return rows
    } catch (error) {
        console.log(error);
    } finally {
        client.release()
    }
}