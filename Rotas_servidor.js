// index.js
const express = require('express');
const cors = require('cors');
const ownerController = require('./controllers/ownerController');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de Donos (Obrigatórias)
app.get('/owners', ownerController.getAllOwners);
app.post('/owners', ownerController.createOwner);
app.delete('/owners/:id', ownerController.deleteOwner);

// Rota de teste
app.get('/', (req, res) => res.send('API Clínica Veterinária Rodando'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
