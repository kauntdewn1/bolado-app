import React from 'react';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from '../lib/firebase';

const NavBarMinimal: React.FC = () => {

  const handleSignIn = async () => {
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 p-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <button onClick={handleSignIn} className="text-lg font-mono tracking-wider cursor-pointer hover:text-gray-300 transition-colors">Acessar</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBarMinimal;