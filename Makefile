# Variáveis
YARN = yarn
NODE = node

# Cores para output
GREEN = \033[0;32m
YELLOW = \033[1;33m
NC = \033[0m # No Color

# Comandos de Desenvolvimento
.PHONY: dev build preview start clean

dev:
	@echo "$(GREEN)Iniciando servidor de desenvolvimento...$(NC)"
	$(YARN) dev

build:
	@echo "$(GREEN)Gerando build de produção...$(NC)"
	$(YARN) build

preview:
	@echo "$(GREEN)Visualizando build de produção...$(NC)"
	$(YARN) preview

start:
	@echo "$(GREEN)Iniciando servidor de preview com acesso externo...$(NC)"
	$(YARN) start

clean:
	@echo "$(YELLOW)Limpando diretórios de build e dependências...$(NC)"
	$(YARN) clean

# Comandos de Teste
.PHONY: test test-watch test-coverage

test:
	@echo "$(GREEN)Executando testes...$(NC)"
	$(YARN) test

test-watch:
	@echo "$(GREEN)Executando testes em modo watch...$(NC)"
	$(YARN) test:watch

test-coverage:
	@echo "$(GREEN)Executando testes com cobertura...$(NC)"
	$(YARN) test:coverage

# Comandos de Qualidade
.PHONY: lint format type-check

lint:
	@echo "$(GREEN)Executando linting...$(NC)"
	$(YARN) lint

format:
	@echo "$(GREEN)Formatando código...$(NC)"
	$(YARN) format

type-check:
	@echo "$(GREEN)Verificando tipos TypeScript...$(NC)"
	$(YARN) type-check

# Comandos de Deploy
.PHONY: deploy deploy-hosting deploy-rules deploy-functions

deploy:
	@echo "$(GREEN)Fazendo deploy completo...$(NC)"
	$(YARN) deploy

deploy-hosting:
	@echo "$(GREEN)Fazendo deploy do hosting...$(NC)"
	$(YARN) deploy:hosting

deploy-rules:
	@echo "$(GREEN)Fazendo deploy das regras do Firestore...$(NC)"
	$(YARN) deploy:rules

deploy-functions:
	cd functions && npm install && firebase deploy --only functions

# Comandos de Instalação
.PHONY: install prepare

install:
	@echo "$(GREEN)Instalando dependências...$(NC)"
	$(YARN) install

prepare:
	@echo "$(GREEN)Instalando hooks do git...$(NC)"
	$(YARN) prepare

# Comandos de Ajuda
.PHONY: help

help:
	@echo "$(GREEN)Comandos disponíveis:$(NC)"
	@echo "$(YELLOW)Desenvolvimento:$(NC)"
	@echo "  make dev          - Inicia servidor de desenvolvimento"
	@echo "  make build        - Gera build de produção"
	@echo "  make preview      - Visualiza build de produção"
	@echo "  make start        - Inicia servidor de preview com acesso externo"
	@echo "  make clean        - Limpa diretórios de build e dependências"
	@echo ""
	@echo "$(YELLOW)Testes:$(NC)"
	@echo "  make test         - Executa testes"
	@echo "  make test-watch   - Executa testes em modo watch"
	@echo "  make test-coverage - Executa testes com cobertura"
	@echo ""
	@echo "$(YELLOW)Qualidade:$(NC)"
	@echo "  make lint         - Executa linting"
	@echo "  make format       - Formata código"
	@echo "  make type-check   - Verifica tipos TypeScript"
	@echo ""
	@echo "$(YELLOW)Deploy:$(NC)"
	@echo "  make deploy       - Faz deploy completo"
	@echo "  make deploy-hosting - Faz deploy do hosting"
	@echo "  make deploy-rules - Faz deploy das regras do Firestore"
	@echo "  make deploy-functions - Faz deploy das funções backend"
	@echo ""
	@echo "$(YELLOW)Instalação:$(NC)"
	@echo "  make install      - Instala dependências"
	@echo "  make prepare      - Instala hooks do git"

# Instalação das dependências necessárias e padronização
setup:
	rm -f package-lock.json
	$(YARN) install
	$(YARN) add react@18 react-dom@18
	$(YARN) add -D @types/react@18 @types/react-dom@18 @types/jest lucide-react
	mv -f src/config/lazyLoad.ts src/config/lazyLoad.tsx || true 