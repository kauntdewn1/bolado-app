# Imagem base oficial do Node
FROM node:24-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos de dependências
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando padrão: inicia o servidor de desenvolvimento
CMD ["yarn", "dev", "--host", "0.0.0.0"] 