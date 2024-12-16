const express = require('express'); // Importa o Express
const path = require('path'); // Importa o módulo 'path'

const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta fornecida pela KingHost ou 3000

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para servir o HTML inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
