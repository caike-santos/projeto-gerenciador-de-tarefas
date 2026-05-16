const mysql = require('mysql2');

// Configurações da conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Usuário padrão do MySQL
  password: '',      // Se você usa XAMPP, geralmente é vazio. Se instalou o MySQL puro, coloque sua senha.
  database: 'projeto_tarefas' 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection; // Exporta para usarmos no server.js