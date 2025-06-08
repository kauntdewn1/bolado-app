import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para criar um documento de exemplo em uma coleção
async function createExampleDoc(collectionName, data) {
  const docRef = doc(collection(db, collectionName));
  await setDoc(docRef, {
    ...data,
    createdAt: Timestamp.now().toString(),
    updatedAt: Timestamp.now().toString()
  });
  console.log(`Documento criado em ${collectionName}`);
}

// Função para configurar as coleções e documentos de exemplo
async function setupFirestore() {
  try {
    // Coleção: users
    await createExampleDoc('users', {
      uid: 'example-user-1',
      email: 'user@example.com',
      displayName: 'Usuário Exemplo',
      role: 'user',
      status: 'active',
      lastLogin: Timestamp.now().toString()
    });

    // Coleção: products
    await createExampleDoc('products', {
      name: 'Produto Exemplo',
      description: 'Descrição do produto exemplo',
      price: 99.99,
      images: ['https://example.com/image.jpg'],
      category: 'categoria-exemplo',
      stock: 10,
      status: 'available'
    });

    // Coleção: orders
    await createExampleDoc('orders', {
      userId: 'example-user-1',
      products: [
        { productId: 'produto-exemplo-1', quantity: 1, price: 99.99 }
      ],
      total: 99.99,
      status: 'pending',
      shippingAddress: {
        street: 'Rua Exemplo',
        number: '123',
        neighborhood: 'Bairro Exemplo',
        city: 'Cidade Exemplo',
        state: 'Estado Exemplo',
        zipCode: '12345-678'
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'pending'
    });

    // Coleção: newsletters
    await createExampleDoc('newsletters', {
      email: 'newsletter@example.com',
      status: 'active',
      subscribedAt: Timestamp.now().toString()
    });

    console.log('Configuração do Firestore concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar o Firestore:', error);
  }
}

// Executa a configuração
setupFirestore(); 