const accountRepository = require("../repositories/account.repository.js");
const baseRes = require("../configs/response.config.js");

exports.registerAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return baseRes(res, false, 400, "data akun tidak boleh kosong", null);
        }

        const result = await accountRepository.createAccount({username, email, password});

        if (!result) {
            return baseRes(res, false, 400, "username atau email sudah digunakan", null);
        }

        delete result.password_hash;

        return baseRes(res, true, 201, "akun berhasil didaftarkan", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal mendaftarkan akun", null);
    }
};

exports.loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return baseRes(res, false, 400, "email atau password tidak boleh kosong", null);
        }

        const result = await accountRepository.loginAccount({email, password});

        if (!result) {
            return baseRes(res, false, 401, "email atau password salah", null);
        }

        delete result.user.password_hash;

        return baseRes(res, true, 200, "berhasil masuk", {
            user: result.user
        });
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal masuk", null);
    }
};

exports.getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return baseRes(res, false, 400, "id akun tidak boleh kosong", null);
        }
        
        const result = await accountRepository.getAccount(id);

        if (!result) {
            return baseRes(res, false, 404, "akun tidak ditemukan", null);
        }

        return baseRes(res, true, 200, "berhasil mengambil data akun", result);
    } catch (error) {
        console.error(error);
        return baseRes(res, false, 500, "gagal mengambil data akun", null);
    }
};