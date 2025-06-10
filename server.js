import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { throwApiError } from './utils/throwApiError.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log('Iniciando servidor...');
console.log('OPENPIX_API_KEY:', process.env.OPENPIX_API_KEY ? 'OK' : 'NÃO DEFINIDA');

// Se você realmente precisa servir arquivos estáticos da pasta dist, mantenha a linha abaixo:
// app.use(express.static(path.join(__dirname, 'dist')));
// Caso contrário, pode remover.

const registeredRoutes = [];

registeredRoutes.push('[POST] /api/OpenPix/create-charge');
app.post('/api/OpenPix/create-charge', async (req, res, next) => {
  console.log('Recebida requisição POST /api/OpenPix/create-charge');
  console.log('Body recebido:', req.body);
  const { email, nome, value = 149700, paymentTypes = ['PIX', 'CREDIT_CARD'] } = req.body;

  try {
    if (!process.env.OPENPIX_API_KEY) {
      throwApiError(
        'Chave da OpenPix não configurada.',
        'OPENPIX_API_KEY_NAO_DEFINIDA',
        'Verifique o arquivo .env e reinicie o servidor.',
        500
      );
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
      throwApiError(
        'Falha ao gerar cobrança',
        'OPENPIX_COBRANCA_FALHOU',
        'Chave de API inválida ou expirada',
        500
      );
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// Middleware de erro deve ser o ÚLTIMO
app.use(errorHandler);

console.log('Rotas após registro:');
if (app._router && app._router.stack) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`Rota registrada: [${Object.keys(middleware.route.methods).join(',').toUpperCase()}] ${middleware.route.path}`);
    }
  });
}

const listRoutes = () => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map((m) => m.toUpperCase())
        .join(', ');
      routes.push(`[${methods}] ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .map((m) => m.toUpperCase())
            .join(', ');
          routes.push(`[${methods}] ${handler.route.path}`);
        }
      });
    }
  });

  if (routes.length > 0) {
    console.log('Rotas registradas:');
    routes.forEach((r) => console.log('→', r));
  } else {
    console.log('Nenhuma rota registrada no Express.');
  }
};

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);

  if (registeredRoutes.length > 0) {
    console.log('Rotas registradas:');
    registeredRoutes.forEach((r) => console.log('→', r));
  } else {
    console.log('Nenhuma rota registrada manualmente.');
  }
});
