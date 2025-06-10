export const errorHandler = (err, req, res, next) => {
  console.error('[Erro Interno]', {
    mensagem: err.message,
    codigo: err.codigo || 'ERRO_DESCONHECIDO',
    detalhe: err.detalhe || null,
    rota: req.originalUrl,
    metodo: req.method,
    corpo: req.body
  });

  res.status(err.status || 500).json({
    sucesso: false,
    mensagem: err.message || 'Erro interno do servidor',
    codigo: err.codigo || 'ERRO_DESCONHECIDO',
    detalhe: err.detalhe || null
  });
}; 