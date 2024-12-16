// Conexão com o servidor Socket.IO
const socket = io(); // O servidor será automaticamente detectado na mesma origem

// Selecionar os elementos do DOM
const messagesDiv = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');

// Receber mensagens do servidor e exibir no chat
socket.on('message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messagesDiv.appendChild(messageElement);

    // Scroll automático para a última mensagem
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Enviar mensagem ao servidor
function sendMessage() {
    const message = inputMessage.value;

    if (message.trim() !== '') {
        socket.emit('chatMessage', message); // Envia a mensagem para o servidor
        inputMessage.value = ''; // Limpa o campo de entrada
    }
}
