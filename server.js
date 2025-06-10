import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

console.log('Iniciando servidor...');
console.log('OPENPIX_API_KEY:', process.env.OPENPIX_API_KEY ? 'OK' : 'NÃO DEFINIDA');

// Se você realmente precisa servir arquivos estáticos da pasta dist, mantenha a linha abaixo:
// app.use(express.static(path.join(__dirname, 'dist')));
// Caso contrário, pode remover.

app.post('/api/OpenPix/create-charge', async (req, res) => {
  console.log('Recebida requisição POST /api/OpenPix/create-charge');
  console.log('Body recebido:', req.body);
  const { email, nome, value = 149700, paymentTypes = ['PIX', 'CREDIT_CARD'] } = req.body;

  try {
    if (!process.env.OPENPIX_API_KEY) {
      console.error('OPENPIX_API_KEY não definida no .env');
      throw new Error('Configuração da API OpenPix não encontrada');
    }

    const payload = {
      correlationID: `pedido-${Date.now()}`,
      value,
      comment: 'Mico Leão Bolado™',
      customer: {
        name: nome || 'Cliente',
        email: email || 'cliente@email.com',
      },
      paymentTypes
    };

    console.log('Payload enviado para OpenPix:', payload);

    const response = await fetch('https://api.openpix.com.br/api/openpix/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.OPENPIX_API_KEY
      },
      body: JSON.stringify(payload)
    });

    console.log('Status da resposta OpenPix:', response.status);
    const data = await response.json();
    console.log('Resposta da OpenPix:', data);

    if (!data.paymentLinkUrl) {
      console.error('Falha ao gerar cobrança:', data);
      throw new Error('Falha ao gerar cobrança');
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao criar cobrança:', error);
    return res.status(500).json({ error: 'Erro ao gerar cobrança', detalhe: error.message });
  }
});
