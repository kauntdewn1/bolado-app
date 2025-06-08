import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const NavBarMinimal: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
      navigate('/index.html'); // Redirect to index.html after successful sign-in
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