
import React from 'react';
import { View, TripState } from '../types';

interface ProfileProps {
  trip: TripState;
  onLogout: () => void;
  setView: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ trip, onLogout, setView }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="px-4 py-6 md:px-8 md:py-10 lg:px-12 flex items-center justify-between sticky top-0 bg-background-light dark:bg-background-dark z-20 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setView(View.DASHBOARD)}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-sm border border-black/5 lg:hidden active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">arrow_back_ios</span>
          </button>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold tracking-tight">My Account</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-primary text-[#1c160d] rounded-full border border-primary/20 shrink-0 shadow-lg shadow-primary/10">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#1c160d] rounded-full animate-pulse"></div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">Shift Active</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-8 lg:px-12 lg:py-10 space-y-6 md:space-y-10 pb-32 lg:pb-10 no-scrollbar">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10 items-start">
          {/* Driver Card */}
          <section className="flex flex-col items-center gap-6 md:gap-8 bg-white dark:bg-card-dark p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-black/[0.03] border border-black/5 xl:sticky xl:top-0">
            <div className="relative group shrink-0">
              <img
                src="https://picsum.photos/seed/driverjohn/800"
                alt="Driver"
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-2xl md:rounded-[3rem] border-4 md:border-8 border-primary/5 shadow-2xl object-cover transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 bg-success text-white px-4 md:px-8 py-1.5 md:py-3 rounded-full border-2 md:border-4 border-white dark:border-card-dark shadow-lg">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">Online</p>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-xl md:text-3xl font-extrabold mb-1 tracking-tight">John Doe</h1>
              <p className="text-black/40 dark:text-white/40 text-base md:text-lg font-semibold">Senior Fleet Officer</p>
              <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
                <span className="bg-black/5 dark:bg-white/5 px-3 py-1 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60">ID: #9921-X</span>
                <span className="bg-black/5 dark:bg-white/5 px-3 py-1 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60">EXP: 8Y</span>
              </div>
            </div>

            <div className="w-full h-px bg-black/5"></div>

            <button
              onClick={onLogout}
              className="w-full h-14 md:h-18 bg-danger text-white rounded-xl md:rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-danger/10 hover:bg-danger/90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-xl md:text-3xl">logout</span>
              <span className="text-sm md:text-lg font-extrabold tracking-tight">Sign Out</span>
            </button>
          </section>

          {/* Details Column */}
          <div className="xl:col-span-2 space-y-6 md:space-y-10">
            <section className="space-y-4 md:space-y-8">
              <h3 className="text-xl md:text-3xl font-extrabold px-2 flex items-center gap-4 tracking-tight">
                <span className="material-symbols-outlined text-primary text-xl md:text-3xl">assignment_ind</span>
                Operational Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-white dark:bg-card-dark rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-black/[0.02] border border-black/5 p-5 md:p-8 flex items-center gap-4 md:gap-6">
                  <div className="bg-primary/10 w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-3xl md:text-5xl material-symbols-fill">directions_bus</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base md:text-xl font-extrabold leading-tight truncate tracking-tight">Bus #{trip.busNumber}</p>
                    <p className="text-black/40 dark:text-white/40 text-xs md:text-sm font-semibold truncate mt-1">Assigned Vehicle</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-black/[0.02] border border-black/5 p-5 md:p-8 flex items-center gap-4 md:gap-6">
                  <div className="bg-primary/10 w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-3xl md:text-5xl material-symbols-fill">route</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base md:text-xl font-extrabold leading-tight truncate tracking-tight">Zone 4: North</p>
                    <p className="text-black/40 dark:text-white/40 text-xs md:text-sm font-semibold truncate mt-1">Primary Territory</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-black/[0.02] border border-black/5 p-5 md:p-8 flex items-center gap-4 md:gap-6">
                  <div className="bg-primary/10 w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-3xl md:text-5xl material-symbols-fill">verified_user</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base md:text-xl font-extrabold leading-tight truncate tracking-tight">Class A CDL</p>
                    <p className="text-black/40 dark:text-white/40 text-xs md:text-sm font-semibold truncate mt-1">License Type</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-black/[0.02] border border-black/5 p-5 md:p-8 flex items-center gap-4 md:gap-6">
                  <div className="bg-primary/10 w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-3xl md:text-5xl material-symbols-fill">medical_services</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base md:text-xl font-extrabold leading-tight truncate tracking-tight">Aug 2025</p>
                    <p className="text-black/40 dark:text-white/40 text-xs md:text-sm font-semibold truncate mt-1">Medical Clearance</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
