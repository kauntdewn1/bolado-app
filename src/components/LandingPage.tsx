import React from 'react';
import NavBarMinimal from './NavBarMinimal';
import HeroSectionMinimal from './HeroSectionMinimal';
import LandingFooter from './LandingFooter';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <NavBarMinimal />
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <HeroSectionMinimal />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
