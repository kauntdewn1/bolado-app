import React from 'react';

const HeroSectionMinimal: React.FC = () => {
  const videoUrl = "https://res.cloudinary.com/di7ub5dqe/video/upload/v1749377253/loopperfeito_ydcgfl.mov";

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Video in absolute highlight */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Product name overlay */}
      <div className="relative z-10 text-white text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin uppercase tracking-widest">
          <span>Mico Leão</span>
          <br />
          <span>Bolado™</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSectionMinimal;