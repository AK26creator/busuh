
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row bg-background-light dark:bg-background-dark">
      {/* Visual Side Panel for Desktop */}
      <div className="hidden lg:flex flex-1 relative bg-primary items-center justify-center p-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/schoolbus/1200/1200" 
            alt="School Bus" 
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>
        <div className="relative z-10 text-white text-center max-w-xl">
          <span className="material-symbols-outlined text-[120px] material-symbols-fill mb-8">directions_bus</span>
          <h1 className="text-6xl font-black mb-6 leading-tight">The smarter way to drive students.</h1>
          <p className="text-2xl font-medium opacity-90 leading-relaxed">
            Real-time tracking, student boarding, and efficient route management all in one place.
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined">shield_person</span>
              <p className="font-bold">Safety First</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined">speed</span>
              <p className="font-bold">Fast Tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 max-w-2xl mx-auto w-full">
        <header className="flex items-center justify-between mb-16 lg:hidden">
          <div className="text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[36px] material-symbols-fill">directions_bus</span>
            <span className="font-black text-xl tracking-tighter">Vidyon</span>
          </div>
          <div className="bg-black/5 dark:bg-white/5 px-4 py-1.5 rounded-full">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">v2.4.1</p>
          </div>
        </header>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">Driver Sign In</h1>
            <p className="text-[#9e7e47] dark:text-[#c4a46d] text-lg font-medium">Welcome back, Captain! Ready for your route?</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="flex flex-col gap-2">
              <label className="text-base font-black uppercase tracking-widest text-[#9e7e47] opacity-60 ml-1">Driver Identifier</label>
              <div className="flex items-center bg-white dark:bg-[#2d2518] border-2 border-transparent shadow-sm rounded-2xl h-16 px-6 focus-within:border-primary focus-within:ring-4 ring-primary/10 transition-all">
                <input 
                  type="text" 
                  placeholder="Enter your Driver ID"
                  className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-lg font-bold placeholder:text-[#9e7e47]/30"
                />
                <span className="material-symbols-outlined text-[#9e7e47]/40">person</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-black uppercase tracking-widest text-[#9e7e47] opacity-60 ml-1">Secure Pin</label>
              <div className="flex items-center bg-white dark:bg-[#2d2518] border-2 border-transparent shadow-sm rounded-2xl h-16 px-6 focus-within:border-primary focus-within:ring-4 ring-primary/10 transition-all">
                <input 
                  type="password" 
                  placeholder="Enter pin"
                  className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-lg font-bold placeholder:text-[#9e7e47]/30"
                />
                <span className="material-symbols-outlined text-[#9e7e47]/40">lock</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-2 border-[#e9dfce] text-primary focus:ring-primary/20" />
                <span className="text-sm font-bold text-[#9e7e47] group-hover:text-primary transition-colors">Remember Me</span>
              </label>
              <a href="#" className="text-sm font-bold text-primary hover:underline underline-offset-4 transition-all">
                Trouble logging in?
              </a>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                type="submit"
                className="w-full h-16 bg-primary text-[#1c160d] font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Log In
              </button>
              <button 
                type="button"
                onClick={onLogin}
                className="w-full h-16 bg-white dark:bg-card-dark border-2 border-primary/20 text-primary font-black text-xl rounded-2xl hover:bg-primary/5 active:scale-[0.98] transition-all"
              >
                Quick Demo Access
              </button>
            </div>
          </form>

          <footer className="mt-16 flex flex-col items-center gap-6">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">help</span>
              </div>
              <span className="text-sm font-bold opacity-60">Fleet Support: 1-800-VIDYON</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
