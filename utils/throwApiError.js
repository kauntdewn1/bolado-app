export const throwApiError = (mensagem, codigo = 'ERRO_GENERICO', detalhe = null, status = 500) => {
  const erro = new Error(mensagem);
  erro.codigo = codigo;
  erro.detalhe = detalhe;
  erro.status = status;
  throw erro;
}; 