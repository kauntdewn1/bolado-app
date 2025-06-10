import React from 'react';

const Hero: React.FC = () => {
  return (
    <>
      <section className="w-full h-[40vh] flex items-center justify-center relative overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://res.cloudinary.com/di7ub5dqe/image/upload/v1748934754/Gen4_remove_ducks_and_use_monkeys_23293047122_ahn9sh.png"
        >
          <source 
            src="https://res.cloudinary.com/di7ub5dqe/video/upload/v1748933541/hero_tjdhal.mov" 
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        
      </section>

      <section className="w-full py-24 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">O Mico Leão Bolado™ chegou.</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          E o mundo não será mais o mesmo.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;