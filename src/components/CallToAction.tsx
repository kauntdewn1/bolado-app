import React, { useState } from 'react';
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, provider, db } from '../lib/firebase';

const CallToAction: React.FC = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      alert('Erro ao autenticar com Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    setLoading(true);
    try {
      let result;
      if (isRegister) {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(result.user);
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName || email,
        email: result.user.email,
        photoURL: result.user.photoURL || '',
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } catch (error: any) {
      if (isRegister) {
        alert('Erro ao cadastrar: ' + (error?.message || 'Verifique os dados.'));
      } else {
        alert('Erro ao autenticar: ' + (error?.message || 'Verifique os dados.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  return (
    <section className="py-32 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Não é apenas um produto.
        </h2>
        <h3 className="text-3xl md:text-5xl font-light text-gray-400 mb-16">
          É um movimento.
        </h3>
        <div className="flex justify-center">
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-16 h-16 rounded-full border-2 border-white" />
              <span className="text-lg font-bold">Bem-vindo, {user.displayName || user.email}!</span>
              <button onClick={handleLogout} className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors duration-300">
                Sair
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <button onClick={handleGoogleLogin} disabled={loading} className="w-full px-6 py-3 bg-white text-black text-lg font-bold rounded hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 24 36.5C16.3 36.5 10 30.2 10 22.5C10 14.8 16.3 8.5 24 8.5C27.3 8.5 30.2 9.7 32.4 11.7L38.1 6C34.4 2.7 29.5 0.5 24 0.5C11.8 0.5 2 10.3 2 22.5C2 34.7 11.8 44.5 24 44.5C36.2 44.5 46 34.7 46 22.5C46 21.1 45.8 20.5 45.5 20Z" fill="#FFC107"/>
                    <path d="M6.3 14.7L13.2 19.3C15 15.2 19.1 12.5 24 12.5C26.6 12.5 29 13.4 30.8 14.9L37.1 9.2C33.7 6.2 29.1 4.5 24 4.5C16.7 4.5 10.3 9.2 6.3 14.7Z" fill="#FF3D00"/>
                    <path d="M24 44.5C31.1 44.5 37.1 41.2 40.7 36.1L33.2 30.8C31.1 32.3 28.3 33.5 24 33.5C19.1 33.5 15 30.8 13.2 26.7L6.3 31.3C10.3 36.8 16.7 44.5 24 44.5Z" fill="#4CAF50"/>
                    <path d="M44.5 20H24V28.5H36.9C36.2 31 34.5 33.1 33.2 34.2L40.7 39.9C43.8 36.3 46 30.9 46 22.5C46 21.1 45.8 20.5 45.5 20Z" fill="#1976D2"/>
                  </g>
                </svg>
                Entrar com Google
              </button>
              <div className="w-full flex flex-col gap-2 mt-4">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  value={email} 
                  onChange={handleEmailChange} 
                  className="w-full px-4 py-2 rounded text-black" 
                />
                <input 
                  type="password" 
                  placeholder="Senha" 
                  value={password} 
                  onChange={handlePasswordChange} 
                  className="w-full px-4 py-2 rounded text-black" 
                />
                <button 
                  onClick={handleEmailAuth} 
                  disabled={loading} 
                  className="w-full px-6 py-3 bg-white text-black text-lg font-bold rounded hover:bg-gray-200 transition-colors duration-300"
                >
                  {isRegister ? 'Cadastrar' : 'Entrar'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsRegister(r => !r)} 
                  className="text-sm underline text-gray-300 mt-2"
                >
                  {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;