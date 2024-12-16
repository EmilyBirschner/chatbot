const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Configuração do servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos
app.use(express.static('public'));

// Perguntas e respostas
const perguntas = {
    1: "Qual o seu nome?",
    2: "Qual a sua idade?",
    3: "Qual a sua profissão?",
    4: "Quais são os seus hobbies?",
    5: "Onde você mora?"
};

const respostas = {
    1: "Eu sou um bot e não tenho nome. Mas qual é o seu nome?",
    2: "Bots não têm idade, mas você deve ser jovem de espírito!",
    3: "Eu sou programado para ajudar, essa é minha profissão.",
    4: "Eu gosto de aprender coisas novas com os humanos!",
    5: "Moro na nuvem, perto de onde você está agora. 😉"
};

// Evento de conexão com o cliente
io.on('connection', (socket) => {
    console.log('Usuário conectado.');

    // Enviar mensagem inicial
    socket.emit('message', "Olá! Escolha um número de 1 a 5 para iniciar a mini entrevista:");

    // Lidar com mensagens recebidas
    socket.on('chatMessage', (msg) => {
        const numero = parseInt(msg);

        if (perguntas[numero]) {
            socket.emit('message', perguntas[numero]);
            socket.emit('message', respostas[numero]);
        } else {
            socket.emit('message', "Opção inválida. Por favor, escolha um número de 1 a 5.");
        }
    });

    // Desconexão
    socket.on('disconnect', () => {
        console.log('Usuário desconectado.');
    });
});

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
