export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    const { email, nome, value = 149700, paymentTypes = ['PIX', 'CREDIT_CARD'] } = req.body;
  
    try {
      if (!process.env.OPENPIX_API_KEY) {
        throw new Error('Configuração da API OpenPix não encontrada');
      }
  
      const payload = {
        correlationID: `pedido-${Date.now()}`,
        value, // em centavos
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
          Authorization: process.env.OPENPIX_API_KEY
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (!data.paymentLinkUrl) {
        throw new Error('Falha ao gerar cobrança');
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error('Erro ao criar cobrança:', error);
      return res.status(500).json({ error: 'Erro ao gerar cobrança' });
    }
  } 