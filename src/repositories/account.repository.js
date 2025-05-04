const db = require("../configs/db.config.js");
const bcrypt = require("bcrypt");

exports.createAccount = async (account) => {
    try {
        const checkUsername = await db.query(
            "SELECT * FROM tutam_accounts WHERE username = $1",
            [account.username]
        );
        
        if (checkUsername.rows.length > 0) {
            return null;
        }
        
        const checkEmail = await db.query(
            "SELECT * FROM tutam_accounts WHERE email = $1",
            [account.email]
        );
        
        if (checkEmail.rows.length > 0) {
            return null;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(account.password, salt);
                
        const res = await db.query(
            "INSERT INTO tutam_accounts (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *;",
            [account.username, account.email, hashedPassword]
        );

        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

exports.loginAccount = async (credentials) => {
    try {
        const res = await db.query(
            "SELECT * FROM tutam_accounts WHERE email = $1;",
            [credentials.email]
        );

        if (res.rows.length > 0) {
            const storedHashedPassword = res.rows[0].password_hash;  
            
            const passwordMatch = await bcrypt.compare(credentials.password, storedHashedPassword);
            
            if (passwordMatch) {
                return {
                    user: res.rows[0]
                };
            } else {
                return null;
            }
        }
        
        return null;
        
    } catch (error) {
        throw error;
    }
};

exports.getAccount = async (id) => {
    try {
        const res = await db.query(
            "SELECT id, username, email, created_at FROM tutam_accounts WHERE id = $1;",
            [id]
        );

        if (res.rows.length === 0) {    
            return null;
        }

        return res.rows[0];
    } catch (error) {
        throw error;
    }
};