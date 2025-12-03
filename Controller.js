// controllers/ownerController.js
const db = require('../db');

exports.getAllOwners = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM owners');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createOwner = async (req, res) => {
    const { name, phone, address } = req.body;
    // Validação obrigatória conforme PDF
    if (!name || !phone) {
        return res.status(400).json({ error: 'Name and Phone are required' });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO owners (name, phone, address) VALUES (?, ?, ?)',
            [name, phone, address]
        );
        res.status(201).json({ id: result.insertId, name, phone, address });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOwner = async (req, res) => {
    const { id } = req.params;
    try {
        // Tenta deletar. Se falhar por causa da FK (tem pets), o MySQL joga erro (RESTRICT)
        await db.query('DELETE FROM owners WHERE id = ?', [id]);
        res.json({ message: 'Owner deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Cannot delete owner with linked pets or system error.' });
    }
};
