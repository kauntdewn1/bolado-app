import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, Product, Order, Newsletter } from '../types/firestore';

// Funções auxiliares
const getTimestamp = () => Timestamp.now().toISOString();

// Operações de Usuário
export const userService = {
  async create(user: Omit<User, 'createdAt'>): Promise<void> {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      ...user,
      createdAt: getTimestamp()
    });
  },

  async get(uid: string): Promise<User | null> {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as User) : null;
  },

  async update(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: getTimestamp()
    });
  },

  async delete(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
  }
};

// Operações de Produto
export const productService = {
  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const productRef = doc(collection(db, 'products'));
    const newProduct = {
      ...product,
      id: productRef.id,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp()
    };
    await setDoc(productRef, newProduct);
    return productRef.id;
  },

  async get(id: string): Promise<Product | null> {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    return productSnap.exists() ? (productSnap.data() as Product) : null;
  },

  async list(category?: string, limitCount = 10): Promise<Product[]> {
    let q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(limitCount));
    if (category) {
      q = query(q, where('category', '==', category));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Product);
  },

  async update(id: string, data: Partial<Product>): Promise<void> {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...data,
      updatedAt: getTimestamp()
    });
  },

  async delete(id: string): Promise<void> {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  }
};

// Operações de Pedido
export const orderService = {
  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const orderRef = doc(collection(db, 'orders'));
    const newOrder = {
      ...order,
      id: orderRef.id,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp()
    };
    await setDoc(orderRef, newOrder);
    return orderRef.id;
  },

  async get(id: string): Promise<Order | null> {
    const orderRef = doc(db, 'orders', id);
    const orderSnap = await getDoc(orderRef);
    return orderSnap.exists() ? (orderSnap.data() as Order) : null;
  },

  async listByUser(userId: string): Promise<Order[]> {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Order);
  },

  async update(id: string, data: Partial<Order>): Promise<void> {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, {
      ...data,
      updatedAt: getTimestamp()
    });
  }
};

// Operações de Newsletter
export const newsletterService = {
  async subscribe(email: string): Promise<void> {
    const newsletterRef = doc(collection(db, 'newsletters'));
    await setDoc(newsletterRef, {
      id: newsletterRef.id,
      email,
      status: 'active',
      subscribedAt: getTimestamp()
    });
  },

  async unsubscribe(email: string): Promise<void> {
    const q = query(collection(db, 'newsletters'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await updateDoc(doc.ref, {
        status: 'unsubscribed',
        unsubscribedAt: getTimestamp()
      });
    }
  },

  async listSubscribers(): Promise<Newsletter[]> {
    const q = query(
      collection(db, 'newsletters'),
      where('status', '==', 'active'),
      orderBy('subscribedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Newsletter);
  }
}; 