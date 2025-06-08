import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente do arquivo .env.local
const envPath = path.join(process.cwd(), '.env.local');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Erro ao carregar o arquivo .env.local:', result.error);
  process.exit(1);
}

// Lista de variáveis necessárias
const requiredVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_TEST_EMAIL',
  'VITE_FIREBASE_TEST_PASSWORD'
];

// Verifica se todas as variáveis necessárias estão definidas
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variáveis de ambiente faltando:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  process.exit(1);
}

// Mostra os valores das variáveis (ocultando partes sensíveis)
console.log('✅ Variáveis de ambiente carregadas:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  const maskedValue = varName.includes('KEY') || varName.includes('PASSWORD')
    ? value.substring(0, 4) + '...' + value.substring(value.length - 4)
    : value;
  console.log(`   ${varName}: ${maskedValue}`);
}); 