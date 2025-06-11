/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const appProd = express();
appProd.use(cors({ origin: true }));
appProd.use(express.json());

const apiKey = process.env.APP_API_KEY;
const openpixClientId = process.env.OPENPIX_CLIENT_ID;

appProd.post('/api/OpenPix/create-charge', async (req, res) => {
  const openpixKey = process.env.OPENPIX_KEY;
  if (!openpixKey) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Chave OpenPix não configurada.',
      codigo: 'OPENPIX_API_KEY_NAO_DEFINIDA',
      detalhe: 'Configure a variável de ambiente OPENPIX_KEY.'
    });
  }

  const { email, nome, value = 149700, paymentTypes = ['PIX', 'CREDIT_CARD'] } = req.body;

  try {
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

    const response = await fetch('https://api.openpix.com.br/api/openpix/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: openpixKey
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!data.paymentLinkUrl) {
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Falha ao gerar cobrança',
        codigo: 'OPENPIX_COBRANCA_FALHOU',
        detalhe: 'Chave de API inválida ou expirada',
        resposta: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: error.message || 'Erro interno do servidor',
      codigo: 'ERRO_INTERNO',
      detalhe: error.stack
    });
  }
});

// Backend em desenvolvimento (pode evoluir à vontade)
const appDev = express();
appDev.use(cors({ origin: true }));
appDev.use(express.json());

// Exemplo de rota inicial (pode evoluir sem medo)
appDev.get('/apiDev/ping', (req, res) => {
  res.json({ status: 'ok', ambiente: 'dev' });
});

// Copie aqui as rotas que quiser evoluir/testar no backend dev

exports.api = functions.https.onRequest(appProd);
exports.apiDev = functions.https.onRequest(appDev);
