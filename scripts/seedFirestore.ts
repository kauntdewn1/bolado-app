import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Configuração do Firebase (ajuste se necessário)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

async function seed() {
  // Usuário exemplo
  await setDoc(doc(db, 'users', 'admin-demo'), {
    uid: 'admin-demo',
    email: 'admin@demo.com',
    displayName: 'Admin Demo',
    photoURL: '',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    role: 'admin',
    status: 'active',
  });

  // Produto exemplo
  const prodRef = doc(db, 'products', 'prod-demo');
  await setDoc(prodRef, {
    id: 'prod-demo',
    name: 'Produto de Exemplo',
    description: 'Descrição do produto de exemplo.',
    price: 99.9,
    images: [],
    category: 'geral',
    stock: 10,
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Pedido exemplo
  const orderRef = doc(db, 'orders', 'order-demo');
  await setDoc(orderRef, {
    id: 'order-demo',
    userId: 'admin-demo',
    products: [{ productId: 'prod-demo', quantity: 1, price: 99.9 }],
    total: 99.9,
    status: 'pending',
    shippingAddress: {
      street: 'Rua Exemplo',
      number: '123',
      neighborhood: 'Centro',
      city: 'Cidade',
      state: 'UF',
      zipCode: '00000-000',
    },
    paymentMethod: 'credit_card',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Newsletter exemplo
  const newsRef = doc(db, 'newsletters', 'news-demo');
  await setDoc(newsRef, {
    id: 'news-demo',
    email: 'newsletter@demo.com',
    status: 'active',
    subscribedAt: new Date().toISOString(),
  });

  console.log('Coleções populadas com sucesso!');
}

seed().catch((e) => {
  console.error('Erro ao popular Firestore:', e);
  process.exit(1);
}); 