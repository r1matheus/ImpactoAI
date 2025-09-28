document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // ** SUBSTITUA PELA URL DO SEU WEBHOOK DO N8N **
    const webhookURL = 'https://n8nbot.ngrok.app/webhook/b9e6006f-2251-43cd-86e4-96c8cda45c2b/chat';

    // Gera um ID de sessão único para a memória do chat no n8n
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 9);

    // Adiciona uma nova mensagem ao chat na tela
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);

        // Rolagem automática para a última mensagem
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Função principal para enviar a mensagem
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Adiciona a mensagem do usuário na tela
        addMessage(message, true);
        userInput.value = '';

        try {
            // Envia a mensagem e o sessionId para o n8n
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatInput: message,
                    sessionId: sessionId
                })
            });

            // Se a resposta da requisição não for OK, lança um erro
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const data = await response.json();

            // Adiciona a resposta do bot na tela, lendo a propriedade 'output'
            if (data && data.output) {
                addMessage(data.output, false);
            } else {
                addMessage("Desculpe, não consegui obter uma resposta. Tente novamente.", false);
            }
        } catch (error) {
            console.error('Erro ao conectar ao n8n:', error);
            addMessage("Ocorreu um erro na comunicação. Por favor, verifique a URL e a conexão do n8n.", false);
        }
    }

    // Adiciona o evento de click no botão de enviar
    sendButton.addEventListener('click', sendMessage);

    // Adiciona o evento de pressionar 'Enter' no campo de texto
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede a quebra de linha
            sendMessage();
        }
    });

    // Mensagem inicial do bot para começar a conversa
    addMessage("Olá! Eu sou assistente pessoal da Giovana Cezari. Como posso te ajudar hoje?", false);
});document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // ** SUBSTITUA PELA URL DO SEU WEBHOOK DO N8N **
    const webhookURL = 'https://n8nbot.ngrok.app/webhook/b9e6006f-2251-43cd-86e4-96c8cda45c2b/chat';

    // Gera um ID de sessão único para a memória do chat no n8n
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 9);

    // Adiciona uma nova mensagem ao chat na tela
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);

        // Rolagem automática para a última mensagem
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Função principal para enviar a mensagem
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Adiciona a mensagem do usuário na tela
        addMessage(message, true);
        userInput.value = '';

        try {
            // Envia a mensagem e o sessionId para o n8n
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatInput: message,
                    sessionId: sessionId
                })
            });

            // Se a resposta da requisição não for OK, lança um erro
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const data = await response.json();

            // Adiciona a resposta do bot na tela, lendo a propriedade 'output'
            if (data && data.output) {
                addMessage(data.output, false);
            } else {
                addMessage("Desculpe, não consegui obter uma resposta. Tente novamente.", false);
            }
        } catch (error) {
            console.error('Erro ao conectar ao n8n:', error);
            addMessage("Ocorreu um erro na comunicação. Por favor, verifique a URL e a conexão do n8n.", false);
        }
    }

    // Adiciona o evento de click no botão de enviar
    sendButton.addEventListener('click', sendMessage);

    // Adiciona o evento de pressionar 'Enter' no campo de texto
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede a quebra de linha
            sendMessage();
        }
    });

});