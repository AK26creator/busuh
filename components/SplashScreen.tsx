
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between py-24 h-screen animate-in fade-in duration-700">
      <div className="h-10"></div>
      <div className="flex flex-col items-center gap-8">
        <div className="w-32 h-32 bg-primary rounded-[2rem] flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white text-7xl material-symbols-fill">
            directions_bus
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-[#1c160d] dark:text-white text-[40px] font-bold leading-none mb-4">
            Vidyon Driver
          </h1>
          <div className="h-1.5 w-12 bg-primary rounded-full mx-auto"></div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce"></div>
          <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
        <p className="text-[#1c160d]/60 dark:text-white/60 text-sm font-semibold tracking-widest uppercase">
          Powered by Vidyon
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
