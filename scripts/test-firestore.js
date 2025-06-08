import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

console.log('🚀 Iniciando script de teste...');

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

console.log('📝 Configuração do Firebase:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : undefined
});

// Inicializa o Firebase
console.log('🔥 Inicializando Firebase...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Função para autenticar
async function authenticate() {
  try {
    console.log('🔑 Tentando autenticar...');
    const userCredential = await signInWithEmailAndPassword(
      auth,
      process.env.VITE_FIREBASE_TEST_EMAIL,
      process.env.VITE_FIREBASE_TEST_PASSWORD
    );
    console.log('✅ Autenticado com sucesso!');
    return userCredential.user;
  } catch (error) {
    console.error('❌ Erro na autenticação:', error);
    throw error;
  }
}

// Função para criar um documento de teste
async function createTestDoc(collectionName, data) {
  try {
    console.log(`📄 Criando documento em ${collectionName}...`);
    const docRef = doc(collection(db, collectionName));
    await setDoc(docRef, {
      ...data,
      id: docRef.id
    });
    console.log(`✅ Documento de teste criado em ${collectionName}`);
  } catch (error) {
    console.error(`❌ Erro ao criar documento em ${collectionName}:`, error);
    throw error;
  }
}

// Função para testar todas as coleções
async function testFirestore() {
  try {
    // Primeiro, autentica
    const user = await authenticate();

    // Teste: users (precisa ser o primeiro para criar o admin)
    await createTestDoc('users', {
      uid: user.uid,
      email: user.email,
      displayName: "Usuário Teste",
      lastLogin: Timestamp.now().toString(),
      createdAt: Timestamp.now().toString(),
      role: true,  // true = admin
      status: true // true = active
    });

    // Teste: products (só admin pode criar)
    await createTestDoc('products', {
      name: "Produto Teste",
      description: "Descrição do produto teste",
      price: 99.99,
      images: ["https://exemplo.com/imagem1.jpg"],
      category: "teste",
      stock: 10,
      status: true, // true = disponível
      createdAt: Timestamp.now().toString(),
      updatedAt: Timestamp.now().toString()
    });

    // Teste: orders (usuário autenticado pode criar)
    await createTestDoc('orders', {
      userId: user.uid,
      products: [
        {
          productId: "prod-test-1",
          quantity: 2,
          price: 99.99
        }
      ],
      total: 199.98,
      status: true, // true = ativo
      shippingAddress: {
        street: "Rua Teste",
        number: "123",
        neighborhood: "Bairro Teste",
        city: "Cidade Teste",
        state: "Estado Teste",
        zipCode: "12345-678"
      },
      paymentMethod: "credit_card",
      paymentStatus: true, // true = pago
      createdAt: Timestamp.now().toString(),
      updatedAt: Timestamp.now().toString()
    });

    // Teste: newsletters (qualquer um pode criar)
    await createTestDoc('newsletters', {
      email: "newsletter@teste.com",
      status: true, // true = ativo
      subscribedAt: Timestamp.now(),
      unsubscribedAt: null
    });

    console.log('✅ Testes concluídos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao testar o Firestore:', error);
  }
}

// Executa os testes
console.log('🎬 Iniciando testes...');
testFirestore(); 