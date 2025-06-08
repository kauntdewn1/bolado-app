require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');

// Inicializar Firebase Admin
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seed() {
  try {
    // Usuário exemplo
    await db.collection('users').doc('admin-demo').set({
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
    await db.collection('products').doc('prod-demo').set({
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
    await db.collection('orders').doc('order-demo').set({
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
    await db.collection('newsletters').doc('news-demo').set({
      id: 'news-demo',
      email: 'newsletter@demo.com',
      status: 'active',
      subscribedAt: new Date().toISOString(),
    });

    console.log('Coleções populadas com sucesso!');
  } catch (error) {
    console.error('Erro ao popular coleções:', error);
    process.exit(1);
  }
}

seed(); 