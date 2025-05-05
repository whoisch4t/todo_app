const db = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tüm alanlar zorunlu.' });
    }

    try {
        const [existing] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Bu email zaten kayıtlı.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db
            .promise()
            .query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
                username,
                email,
                hashedPassword,
            ]);

        const token = generateToken({ id: result.insertId });

        res.status(201).json({
            message: 'Kayıt başarılı',
            token,
            user: { id: result.insertId, username },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Email veya şifre hatalı.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Email veya şifre hatalı.' });
        }

        const token = generateToken({ id: user.id });

        res.status(200).json({
            token,
            user: { id: user.id, username: user.username },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};

module.exports = {
    register,
    login,
};
