
import React, { useState } from 'react';
import { UserRole } from '../types';
import { supabase } from '../supabaseClient';

interface LoginScreenProps {
  onLogin: (role: UserRole, session: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.DRIVER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.session) {
        // Fetch profile to verify role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (profileError) throw profileError;

        if (profile.role !== selectedRole) {
          setError(`Access denied. Your account is registered as ${profile.role}, but you selected ${selectedRole}.`);
          await supabase.auth.signOut();
          return;
        }

        onLogin(profile.role as UserRole, data.session);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] lg:flex-row bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Visual Side Panel for Desktop */}
      <div className="hidden lg:flex flex-1 relative bg-[#f3ae3d] items-center justify-center p-12 xl:p-20 shrink-0 shadow-2xl z-10">

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
          <div className="text-[#f3ae3d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] md:text-[32px] material-symbols-fill">directions_bus</span>
            <span className="font-black text-xl tracking-tighter">Vidyon</span>
          </div>
          <div className="bg-black/5 dark:bg-white/5 px-4 py-1.5 rounded-full border border-black/5">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">v2.4.1</p>
          </div>
        </header>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 md:mb-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 md:mb-6 tracking-tight">Sign In</h1>
            <p className="text-black/40 dark:text-white/40 text-base md:text-lg font-semibold leading-relaxed">Welcome back! Please select your role and sign in.</p>
          </div>

          <form className="space-y-6 md:space-y-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/30 dark:text-white/30 ml-1">Account Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole(UserRole.DRIVER)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedRole === UserRole.DRIVER ? 'border-[#f3ae3d] bg-[#f3ae3d]/5' : 'border-black/5 dark:border-white/5'}`}
                >
                  <span className="material-symbols-outlined text-2xl">directions_bus</span>
                  <span className="font-bold text-sm">Driver</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole(UserRole.INSTITUTION)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedRole === UserRole.INSTITUTION ? 'border-[#f3ae3d] bg-[#f3ae3d]/5' : 'border-black/5 dark:border-white/5'}`}
                >
                  <span className="material-symbols-outlined text-2xl">school</span>
                  <span className="font-bold text-sm">Institution</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/30 dark:text-white/30 ml-1">Email Address</label>
              <div className="flex items-center bg-white dark:bg-[#2b2214] border-2 border-transparent shadow-xl shadow-black/[0.02] rounded-xl md:rounded-2xl h-14 md:h-18 px-5 md:px-7 focus-within:border-[#f3ae3d] focus-within:ring-4 ring-[#f3ae3d]/10 transition-all">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm md:text-lg font-bold placeholder:text-black/10 dark:text-white"
                  required
                />
                <span className="material-symbols-outlined text-[#f3ae3d]/40 text-xl md:text-3xl">mail</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/30 dark:text-white/30 ml-1">Password</label>
              <div className="flex items-center bg-white dark:bg-[#2b2214] border-2 border-transparent shadow-xl shadow-black/[0.02] rounded-xl md:rounded-2xl h-14 md:h-18 px-5 md:px-7 focus-within:border-[#f3ae3d] focus-within:ring-4 ring-[#f3ae3d]/10 transition-all">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm md:text-lg font-bold placeholder:text-black/10 dark:text-white"
                  required
                />
                <span className="material-symbols-outlined text-[#f3ae3d]/40 text-xl md:text-3xl">lock</span>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}

            <div className="space-y-4 md:space-y-6 pt-4 md:pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 md:h-16 bg-[#f3ae3d] text-[#1c160d] font-extrabold text-base md:text-xl rounded-xl md:rounded-2xl shadow-2xl shadow-[#f3ae3d]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Authenticating...' : 'Log In'}
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
