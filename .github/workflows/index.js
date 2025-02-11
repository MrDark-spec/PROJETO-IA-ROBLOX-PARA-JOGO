 const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Chave da OpenAI

app.post('/ia', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo", // Modelo da OpenAI
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const respostaDaIA = response.data.choices[0].message.content;
        res.json({ response: respostaDaIA });
    } catch (error) {
        console.error('Erro ao chamar a API da OpenAI:', error);
        res.status(500).json({ error: 'Erro ao processar a mensagem' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});