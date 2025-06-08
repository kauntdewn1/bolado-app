import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { auth, provider } from '../lib/firebase';
import { signInWithPopup, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({
    currentUser: null,
    onAuthStateChanged: jest.fn((callback) => {
      callback(null);
      return jest.fn();
    }),
  })),
  GoogleAuthProvider: jest.fn(),
}));

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getFirestore: jest.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with null user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('should handle Google login successfully', async () => {
    const mockUser = {
      uid: '123',
      displayName: 'Test User',
      email: 'test@example.com',
      photoURL: 'https://example.com/photo.jpg',
    };

    (signInWithPopup as jest.Mock).mockResolvedValueOnce({ user: mockUser });
    (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleGoogleLogin();
    });

    expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
    expect(setDoc).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it('should handle Google login error', async () => {
    (signInWithPopup as jest.Mock).mockRejectedValueOnce(new Error('Auth failed'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleGoogleLogin();
    });

    expect(result.current.error).toBe('Erro ao autenticar com Google. Por favor, tente novamente.');
  });

  it('should handle email registration successfully', async () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
    };

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user: mockUser });
    (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleEmailAuth('test@example.com', 'Test123', true);
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'Test123');
    expect(setDoc).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it('should validate password requirements', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleEmailAuth('test@example.com', 'weak', true);
    });

    expect(result.current.error).toBe('A senha deve ter pelo menos 6 caracteres');
  });

  it('should handle logout successfully', async () => {
    (signOut as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogout();
    });

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(result.current.error).toBeNull();
  });
}); 