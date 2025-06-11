import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSectionMinimal from './HeroSectionMinimal';
import LandingFooter from './LandingFooter';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.location.pathname === '/') {
        navigate('/app');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`landing-page relative overflow-hidden`}>
      <div
        className="min-h-screen bg-black text-white flex flex-col items-center justify-center transition-all duration-700"
      >
        <HeroSectionMinimal />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
