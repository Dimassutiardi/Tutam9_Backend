const { Pool } = require('pg');
require('dotenv').config();

function createDatabaseConnection() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    return {
        query: async (text, params) => {
            const client = await pool.connect();
            try {
                const res = await client.query(text, params);
                return res;
            } finally {
                client.release();
            }
        },
        
        connect: async () => {
            try {
                const client = await pool.connect();
                console.log("Connected database\n");
                client.release();
            } catch (err) {
                console.log("Fail database");
            }
        },
        
        pool
    };
}

module.exports = createDatabaseConnection();