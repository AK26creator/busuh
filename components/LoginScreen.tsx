import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col min-h-[100dvh] lg:flex-row bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Visual Side Panel for Desktop */}
      <div className="hidden lg:flex flex-1 relative bg-primary items-center justify-center p-12 xl:p-20 shrink-0 shadow-2xl z-10">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://picsum.photos/seed/schoolbus/1200/1200"
            alt="School Bus"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        <div className="relative z-10 text-[#1c160d] text-center max-w-xl">
          <span className="material-symbols-outlined text-[60px] xl:text-[90px] material-symbols-fill mb-6 xl:mb-8">directions_bus</span>
          <h1 className="text-3xl xl:text-5xl font-extrabold mb-4 xl:mb-8 leading-tight tracking-tight">The smarter way to drive students.</h1>
          <p className="text-lg xl:text-xl font-semibold opacity-90 leading-relaxed">
            Real-time tracking, student boarding, and efficient route management all in one place.
          </p>
          <div className="mt-8 xl:mt-14 flex gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-xl px-6 py-4 rounded-2xl flex items-center gap-3 border border-white/30">
              <span className="material-symbols-outlined">shield_person</span>
              <p className="font-extrabold tracking-tight">Safety First</p>
            </div>
            <div className="bg-white/20 backdrop-blur-xl px-6 py-4 rounded-2xl flex items-center gap-3 border border-white/30">
              <span className="material-symbols-outlined">speed</span>
              <p className="font-extrabold tracking-tight">Fast Tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-8 md:py-16 lg:px-12 xl:px-20 max-w-2xl mx-auto w-full overflow-y-auto no-scrollbar">
        <header className="flex items-center justify-between mb-8 md:mb-16 lg:hidden">
          <div className="text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] md:text-[32px] material-symbols-fill">directions_bus</span>
            <span className="font-black text-xl tracking-tighter">Vidyon</span>
          </div>
          <div className="bg-black/5 dark:bg-white/5 px-4 py-1.5 rounded-full border border-black/5">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">v2.4.1</p>
          </div>
        </header>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 md:mb-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 md:mb-6 tracking-tight">Driver Sign In</h1>
            <p className="text-black/40 dark:text-white/40 text-base md:text-lg font-semibold leading-relaxed">Welcome back, Captain! Ready for your route today?</p>
          </div>

          <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/30 dark:text-white/30 ml-1">Driver Identifier</label>
              <div className="flex items-center bg-white dark:bg-card-dark border-2 border-transparent shadow-xl shadow-black/[0.02] rounded-xl md:rounded-2xl h-14 md:h-18 px-5 md:px-7 focus-within:border-primary focus-within:ring-4 ring-primary/10 transition-all">
                <input
                  type="text"
                  placeholder="Enter your Driver ID"
                  className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm md:text-lg font-bold placeholder:text-black/10"
                />
                <span className="material-symbols-outlined text-primary/40 text-xl md:text-3xl">person</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/30 dark:text-white/30 ml-1">Secure Pin</label>
              <div className="flex items-center bg-white dark:bg-card-dark border-2 border-transparent shadow-xl shadow-black/[0.02] rounded-xl md:rounded-2xl h-14 md:h-18 px-5 md:px-7 focus-within:border-primary focus-within:ring-4 ring-primary/10 transition-all">
                <input
                  type="password"
                  placeholder="Enter pin"
                  className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm md:text-lg font-bold placeholder:text-black/10"
                />
                <span className="material-symbols-outlined text-primary/40 text-xl md:text-3xl">lock</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-1 md:px-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-2 border-black/10 text-primary focus:ring-primary/20" />
                <span className="text-xs md:text-sm font-bold text-black/40 group-hover:text-primary transition-colors">Remember Me</span>
              </label>
              <button type="button" className="text-xs md:text-sm font-bold text-primary hover:underline underline-offset-8 transition-all">
                Trouble logging in?
              </button>
            </div>

            <div className="space-y-4 md:space-y-6 pt-4 md:pt-6">
              <button
                type="submit"
                className="w-full h-12 md:h-16 bg-primary text-[#1c160d] font-extrabold text-base md:text-xl rounded-xl md:rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Log In
              </button>

            </div>
          </form>

          <footer className="mt-12 md:mt-16 flex flex-col items-center gap-4 md:gap-6">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-xs md:text-sm">help</span>
              </div>
              <span className="text-xs md:text-sm font-bold opacity-60">Fleet Support: 1-800-VIDYON</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
