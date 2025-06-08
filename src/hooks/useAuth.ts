import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthCache } from './useAuthCache';

interface AuthError {
  code: string;
  message: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  handleGoogleLogin: () => Promise<void>;
  handleEmailAuth: (email: string, password: string, isRegister: boolean) => Promise<void>;
  handleLogout: () => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
}

/**
 * Hook personalizado para gerenciar autenticação
 * @returns {UseAuthReturn} Objeto contendo estado e funções de autenticação
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { cachedUser, saveToCache, clearCache } = useAuthCache();

  useEffect(() => {
    if (cachedUser) {
      setUser(cachedUser);
    }
  }, [cachedUser]);

  /**
   * Valida os requisitos de senha
   * @param {string} password - Senha a ser validada
   * @returns {boolean} True se válida, false caso contrário
   */
  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= minLength && hasUpperCase && hasNumber;
  };

  /**
   * Realiza login com Google
   * @throws {Error} Erro na autenticação
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      setUser(user);
      saveToCache(user);
      setSuccess('Login realizado com sucesso!');
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro no login com Google:', error);
      setError('Falha ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza autenticação com email/senha
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @param {boolean} isRegister - Se é registro ou login
   * @throws {Error} Erro na autenticação
   */
  const handleEmailAuth = async (email: string, password: string, isRegister: boolean) => {
    setLoading(true);
    setError(null);
    try {
      if (!email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      if (isRegister && !validatePassword(password)) {
        throw new Error('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.');
      }

      const result = isRegister
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = result.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        lastLogin: new Date().toISOString()
      }, { merge: true });

      setUser(user);
      saveToCache(user);
      setSuccess(isRegister ? 'Cadastro realizado com sucesso!' : 'Login realizado com sucesso!');
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro na autenticação:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este e-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        case 'auth/operation-not-allowed':
          setError('Operação não permitida.');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca.');
          break;
        case 'auth/user-disabled':
          setError('Esta conta foi desativada.');
          break;
        case 'auth/user-not-found':
          setError('Usuário não encontrado.');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta.');
          break;
        default:
          setError('Ocorreu um erro durante a autenticação. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Envia email de recuperação de senha
   * @param {string} email - Email do usuário
   * @throws {Error} Erro ao enviar email
   */
  const handlePasswordReset = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!email) {
        throw new Error('Por favor, insira seu e-mail.');
      }

      await sendPasswordResetEmail(auth, email);
      setSuccess('E-mail de recuperação enviado com sucesso!');
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro ao enviar e-mail de recuperação:', error);
      
      switch (error.code) {
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        case 'auth/user-not-found':
          setError('Não existe uma conta com este e-mail.');
          break;
        default:
          setError('Falha ao enviar e-mail de recuperação. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza logout do usuário
   * @throws {Error} Erro ao fazer logout
   */
  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      clearCache();
      setSuccess('Logout realizado com sucesso!');
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro ao fazer logout:', error);
      setError('Falha ao fazer logout. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    success,
    handleGoogleLogin,
    handleEmailAuth,
    handleLogout,
    handlePasswordReset
  };
}; 