export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  lastLogin: string;
  createdAt: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  status: 'available' | 'sold_out' | 'coming_soon';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: 'credit_card' | 'pix' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Newsletter {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  unsubscribedAt?: string;
} 