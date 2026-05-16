const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa a conexão que fizemos acima

const app = express();

app.use(cors()); 
app.use(express.json());

// ... seus requires (express, cors, db) continuam aqui ...

// ROTA 1: Buscar todas as tarefas do banco
app.get('/tarefas', (req, res) => {
    const query = 'SELECT * FROM tarefas';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// ROTA 2: Adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao } = req.body; // Pega o que o usuário digitou no front
    const query = 'INSERT INTO tarefas (descricao) VALUES (?)';
    
    db.query(query, [descricao], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, descricao, status: 'pendente' });
    });
});

// ROTA 3: Deletar uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tarefas WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Tarefa deletada com sucesso!' });
    });
});


// Porta onde o servidor vai rodar
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});