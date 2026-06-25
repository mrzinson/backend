const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkUsers() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('Successfully connected to database.');

        // Get count and first few users
        const [users] = await connection.execute(
            'SELECT id, name, username, whatsapp_number, is_suspended, created_at FROM users LIMIT 30'
        );
        console.log('Total users fetched:', users.length);
        console.table(users);

        // Get user wallet info
        const [wallets] = await connection.execute(
            'SELECT uw.user_id, u.whatsapp_number, uw.balance FROM user_wallet uw JOIN users u ON uw.user_id = u.id LIMIT 30'
        );
        console.log('Wallets fetched:');
        console.table(wallets);

    } catch (err) {
        console.error('Error running check:', err);
    } finally {
        if (connection) await connection.end();
    }
}

checkUsers();
