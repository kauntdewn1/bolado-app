import fs from 'fs';
import path from 'path';

const envContent = `# Firebase Config
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Test User Credentials
VITE_FIREBASE_TEST_EMAIL=
VITE_FIREBASE_TEST_PASSWORD=
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env.local criado com sucesso!');
  console.log('Por favor, preencha as variáveis no arquivo .env.local com seus dados do Firebase.');
} catch (error) {
  console.error('❌ Erro ao criar arquivo .env.local:', error);
} 