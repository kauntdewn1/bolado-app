#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Função para exibir mensagens de erro
error() {
    echo -e "${RED}Erro: $1${NC}"
    exit 1
}

# Função para exibir mensagens de sucesso
success() {
    echo -e "${GREEN}$1${NC}"
}

# Função para exibir mensagens de aviso
warning() {
    echo -e "${YELLOW}$1${NC}"
}

# Verificar se o Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    warning "Firebase CLI não encontrado. Instalando..."
    npm install -g firebase-tools || error "Falha ao instalar Firebase CLI"
fi

# Verificar se está logado no Firebase
if ! firebase projects:list &> /dev/null; then
    warning "Não está logado no Firebase. Iniciando processo de login..."
    firebase login || error "Falha ao fazer login no Firebase"
fi

# Verificar se o projeto está inicializado
if [ ! -f "firebase.json" ]; then
    warning "Projeto Firebase não inicializado. Iniciando configuração..."
    firebase init || error "Falha ao inicializar projeto Firebase"
fi

# Construir o projeto
warning "Construindo o projeto..."
npm run build || error "Falha ao construir o projeto"

# Implantar regras do Firestore
warning "Implantando regras do Firestore..."
firebase deploy --only firestore:rules || error "Falha ao implantar regras do Firestore"

# Implantar índices do Firestore
warning "Implantando índices do Firestore..."
firebase deploy --only firestore:indexes || error "Falha ao implantar índices do Firestore"

# Implantar hosting
warning "Implantando hosting..."
firebase deploy --only hosting || error "Falha ao implantar hosting"

success "Implantação concluída com sucesso!"
success "URL do projeto: $(firebase hosting:channel:list | grep 'live' | awk '{print $2}')" 