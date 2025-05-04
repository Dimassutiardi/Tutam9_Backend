const db = require("../configs/db.config.js");

exports.createNote = async (note) => {
    try {
        const res = await db.query(
            "INSERT INTO tutam_notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *;",
            [note.user_id, note.title, note.content]
        );

        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

exports.getNotes = async (user_id) => {
    try {
        const res = await db.query(
            "SELECT * FROM tutam_notes WHERE user_id = $1 ORDER BY updated_at DESC;",
            [user_id]
        );

        return res.rows;
    } catch (error) {
        throw error;
    }
};

exports.getNote = async (id, user_id) => {
    try {
        const res = await db.query(
            "SELECT * FROM tutam_notes WHERE id = $1 AND user_id = $2;",
            [id, user_id]
        );

        if (res.rows.length === 0) {    
            return null;
        }

        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

exports.updateNote = async (note) => {
    try {
        const checkNote = await db.query(
            "SELECT * FROM tutam_notes WHERE id = $1 AND user_id = $2",
            [note.id, note.user_id]
        );
        
        if (checkNote.rows.length === 0) {
            return null;
        }
        
        const res = await db.query(
            "UPDATE tutam_notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *",
            [note.title, note.content, note.id, note.user_id]
        );
        
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

exports.deleteNote = async (id, user_id) => {
    try {
        const checkNote = await db.query(
            "SELECT * FROM tutam_notes WHERE id = $1 AND user_id = $2",
            [id, user_id]
        );
        
        if (checkNote.rows.length === 0) {
            return null;
        }
        
        const res = await db.query(
            "DELETE FROM tutam_notes WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, user_id]
        );
        
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};