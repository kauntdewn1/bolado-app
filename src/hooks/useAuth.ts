import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface AuthError {
  code: string;
  message: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  isInitialized: boolean;
  handleGoogleLogin: () => Promise<void>;
  handleEmailAuth: (email: string, password: string, isRegister: boolean) => Promise<void>;
  handleLogout: () => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  clearMessages: () => void;
}

/**
 * Hook personalizado para gerenciar autenticação
 * @returns {UseAuthReturn} Objeto contendo estado e funções de autenticação
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Listener principal do Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Valida formato de email
   * @param {string} email - Email a ser validado
   * @returns {boolean} True se válido, false caso contrário
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida os requisitos de senha
   * @param {string} password - Senha a ser validada
   * @returns {boolean} True se válida, false caso contrário
   */
  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumber && 
           hasSpecialChar;
  };

  /**
   * Salva dados do usuário no Firestore
   * @param {User} user - Usuário a ser salvo
   */
  const saveUserToFirestore = async (user: User) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0],
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Erro ao salvar usuário no Firestore:', error);
    }
  };

  /**
   * Limpa mensagens de erro e sucesso
   */
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  /**
   * Realiza login com Google
   * @throws {Error} Erro na autenticação
   */
  const handleGoogleLogin = async () => {
    if (loading) return;
    
    setLoading(true);
    clearMessages();
    
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      await saveUserToFirestore(user);
      setSuccess('Login realizado com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro no login com Google:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Login cancelado pelo usuário.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup bloqueado. Permita popups para este site.');
      } else {
        setError('Falha ao fazer login com Google. Tente novamente.');
      }
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
    if (loading) return;
    
    setLoading(true);
    clearMessages();
    
    try {
      // Validações
      if (!email?.trim() || !password?.trim()) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      if (!validateEmail(email)) {
        throw new Error('Por favor, insira um e-mail válido.');
      }

      if (isRegister && !validatePassword(password)) {
        throw new Error(
          'A senha deve ter pelo menos 8 caracteres, incluindo: ' +
          'maiúscula, minúscula, número e caractere especial.'
        );
      }

      const result = isRegister
        ? await createUserWithEmailAndPassword(auth, email.trim(), password)
        : await signInWithEmailAndPassword(auth, email.trim(), password);

      const user = result.user;
      await saveUserToFirestore(user);
      
      const successMessage = isRegister 
        ? 'Cadastro realizado com sucesso!' 
        : 'Login realizado com sucesso!';
      
      setSuccess(successMessage);
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro na autenticação:', error);
      
      // Mapeamento de erros específicos
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Este e-mail já está em uso.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/operation-not-allowed': 'Operação não permitida.',
        'auth/weak-password': 'A senha é muito fraca.',
        'auth/user-disabled': 'Esta conta foi desativada.',
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
        'auth/invalid-credential': 'Credenciais inválidas.'
      };
      
      const errorMessage = errorMessages[error.code] || 
        error.message || 
        'Ocorreu um erro durante a autenticação. Tente novamente.';
      
      setError(errorMessage);
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
    if (loading) return;
    
    setLoading(true);
    clearMessages();
    
    try {
      if (!email?.trim()) {
        throw new Error('Por favor, insira seu e-mail.');
      }

      if (!validateEmail(email)) {
        throw new Error('Por favor, insira um e-mail válido.');
      }

      await sendPasswordResetEmail(auth, email.trim());
      setSuccess('E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      
      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => setSuccess(null), 5000);
      
    } catch (err) {
      const error = err as AuthError;
      console.error('Erro ao enviar e-mail de recuperação:', error);
      
      const errorMessages: Record<string, string> = {
        'auth/invalid-email': 'E-mail inválido.',
        'auth/user-not-found': 'Não existe uma conta com este e-mail.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.'
      };
      
      const errorMessage = errorMessages[error.code] || 
        'Falha ao enviar e-mail de recuperação. Tente novamente.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza logout do usuário
   * @throws {Error} Erro ao fazer logout
   */
  const handleLogout = async () => {
    if (loading) return;
    
    setLoading(true);
    clearMessages();
    
    try {
      await signOut(auth);
      setSuccess('Logout realizado com sucesso!');
      
      // Limpar mensagem de sucesso após 2 segundos
      setTimeout(() => setSuccess(null), 2000);
      
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
    isInitialized,
    handleGoogleLogin,
    handleEmailAuth,
    handleLogout,
    handlePasswordReset,
    clearMessages
  };
};