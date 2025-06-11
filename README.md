# Bolado App

Aplicação web moderna para gerenciamento de vendas e pré-vendas.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- Firebase (Auth, Firestore)
- Tailwind CSS
- Lucide Icons

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/kauntdewn1/bolado-app.git

# Entre no diretório
cd bolado-app

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas credenciais do Firebase

# Inicie o servidor de desenvolvimento
yarn dev
```

## 🔧 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative o Authentication e Firestore
3. Copie as credenciais do projeto para o arquivo `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=seu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
   VITE_FIREBASE_PROJECT_ID=seu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   ```

## 🏗️ Estrutura do Projeto

```
src/
  ├── components/     # Componentes React
  ├── config/        # Configurações (Firebase, etc)
  ├── hooks/         # Custom hooks
  ├── lib/           # Bibliotecas e utilitários
  ├── services/      # Serviços (Firestore, etc)
  └── styles/        # Estilos globais
```

## 📝 Scripts Disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn build` - Gera a build de produção
- `yarn preview` - Visualiza a build de produção localmente
- `yarn lint` - Executa o linter

## 🔒 Segurança

- Autenticação via Firebase
- Regras de segurança no Firestore
- Variáveis de ambiente para credenciais sensíveis

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Sim! Para remover o React, apagar o cache e instalar novamente, siga estes passos no terminal:

---

### 1. Remover React e dependências relacionadas

Se usa **yarn**:
```sh
yarn remove react react-dom
```
Se usa **npm**:
```sh
npm uninstall react react-dom
```

---

### 2. Apagar cache

**Yarn:**

```sh
yarn cache clean
```

**npm:**

```sh
npm cache clean --force
```

---

### 3. Remover node_modules e lockfile

```sh
rm -rf node_modules yarn.lock package-lock.json
```

---

### 4. Instalar novamente as dependências

**Yarn:**

```sh
yarn install
yarn add react react-dom
```

---

### 5. (Opcional) Verifique a versão instalada

```sh
yarn list react
```

---

 Isso garante uma instalação limpa do React e resolve muitos problemas de cache e dependências corrompidas. Se der algum erro, envie a mensagem aqui!

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔥 Cloud Functions

Para instalar dependências e fazer deploy das funções backend:

```sh
cd functions
npm install
firebase deploy --only functions
```

Se alterar variáveis de ambiente, rode:

```sh
firebase deploy --only functions
```

## 🚀 Como enviar o projeto para o GitHub

1. Crie um repositório no GitHub (https://github.com/new)
2. No terminal, dentro da pasta do projeto, rode:

```sh
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Troque `SEU_USUARIO` e `SEU_REPOSITORIO` pelo seu usuário e nome do repositório no GitHub.

Se já existe um repositório e você só quer enviar novas alterações:

```sh
git add .
git commit -m "Descreva sua alteração"
git push
```
