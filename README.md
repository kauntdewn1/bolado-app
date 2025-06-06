# Mico Leão Bolado App

Aplicação web moderna para divulgação e venda de colecionáveis digitais, construída com React, TypeScript, Vite e TailwindCSS.

## Objetivo
Plataforma para apresentar o personagem Mico Leão Bolado, suas coleções e eventos, com integração futura ao Firebase.

## Tecnologias Utilizadas
- React 18
- TypeScript
- Vite
- TailwindCSS
- Lucide React (ícones)
- Firebase (integração futura)

## Instalação
```bash
git clone https://github.com/kauntdewn1/bolado-app.git
cd micoleao-appproject
npm install
```

## Scripts Disponíveis
- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run preview` — Visualiza build de produção
- `npm run lint` — Executa linter

## Estrutura do Projeto
```
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React reutilizáveis
│   ├── lib/               # Integrações e utilitários (ex: Firebase)
│   ├── styles/            # Estilos customizados
│   └── App.tsx            # Componente principal
├── package.json           # Dependências e scripts
├── .gitignore             # Arquivos ignorados pelo git
└── README.md              # Este arquivo
```

## Integração com Firebase
- O arquivo de credenciais do Firebase (`micoleao-app-firebase-adminsdk-*.json`) **NÃO deve ser versionado** (já está no `.gitignore`).
- Para usar o Firebase, implemente a configuração em `src/lib/firebase.ts`.
- Nunca exponha segredos no frontend.

## Boas Práticas
- Sempre use variáveis de ambiente para segredos.
- Mantenha dependências atualizadas.
- Escreva testes para componentes críticos.
- Documente lógicas complexas.

## Licença
MIT # micoleao-app
# bolado-app
# bolado-app
