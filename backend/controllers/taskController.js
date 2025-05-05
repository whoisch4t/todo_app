const db = require('../db');

const getTasks = async (req, res) => {
    try {
        const [tasks] = await db.promise().query(
            'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
            [req.userId]
        );
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Görevler alınamadı.' });
    }
};

const createTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Başlık boş bırakılamaz.' });
    }

    try {
        await db.promise().query(
            'INSERT INTO tasks (user_id, title) VALUES (?, ?)',
            [req.userId, title]
        );
        res.status(201).json({ message: 'Görev oluşturuldu.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Görev oluşturulamadı.' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        await db.promise().query(
            'UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
            [title, completed, id, req.userId]
        );
        res.status(200).json({ message: 'Görev güncellendi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Görev güncellenemedi.' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await db.promise().query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [id, req.userId]
        );
        res.status(200).json({ message: 'Görev silindi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Görev silinemedi.' });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
