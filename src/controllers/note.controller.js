const noteRepository = require("../repositories/note.repository.js");
const baseRes = require("../configs/response.config.js");

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.headers['user-id'];
        
        if (!user_id) {
            return baseRes(res, false, 400, "id pengguna tidak boleh kosong", null);
        }
        
        if (!title) {
            return baseRes(res, false, 400, "judul catatan tidak boleh kosong", null);
        }

        const result = await noteRepository.createNote({
            user_id,
            title,
            content: content || ""
        });

        return baseRes(res, true, 201, "berhasil membuat catatan", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal membuat catatan", null);
    }
};

exports.getNotes = async (req, res) => {
    try {
        const user_id = req.headers['user-id'];
        
        if (!user_id) {
            return baseRes(res, false, 400, "id user tidak boleh kosong", null);
        }
        
        const result = await noteRepository.getNotes(user_id);

        return baseRes(res, true, 200, "berhasil mengambil data note", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal mengambil data note", null);
    }
};

exports.getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.headers['user-id'];
        
        if (!user_id) {
            return baseRes(res, false, 400, "id user tidak boleh kosong", null);
        }
        
        if (!id) {
            return baseRes(res, false, 400, "id note tidak boleh kosong", null);
        }
        
        const result = await noteRepository.getNote(id, user_id);

        if (!result) {
            return baseRes(res, false, 404, "note tidak ditemukan atau akses ditolak", null);
        }

        return baseRes(res, true, 200, "berhasil mengambil data note", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal mengambil data note", null);
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const user_id = req.headers['user-id'];
        
        if (!user_id) {
            return baseRes(res, false, 400, "id user tidak boleh kosong", null);
        }
        
        if (!id) {
            return baseRes(res, false, 400, "id note tidak boleh kosong", null);
        }

        if (!title) {
            return baseRes(res, false, 400, "judul note tidak boleh kosong", null);
        }
        
        const result = await noteRepository.updateNote({
            id,
            user_id,
            title,
            content: content || ""
        });

        if (!result) {
            return baseRes(res, false, 404, "note tidak ditemukan atau akses ditolak", null);
        }

        return baseRes(res, true, 200, "berhasil memperbarui note", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal memperbarui note", null);
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.headers['user-id'];
        
        if (!user_id) {
            return baseRes(res, false, 400, "id user tidak boleh kosong", null);
        }
        
        if (!id) {
            return baseRes(res, false, 400, "id note tidak boleh kosong", null);
        }
        
        const result = await noteRepository.deleteNote(id, user_id);

        if (!result) {
            return baseRes(res, false, 404, "note tidak ditemukan atau akses ditolak", null);
        }

        return baseRes(res, true, 200, "berhasil menghapus note", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal menghapus note", null);
    }
};