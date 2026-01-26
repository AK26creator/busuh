
import React from 'react';
import { View, TripState } from '../types';

interface ProfileProps {
  trip: TripState;
  onLogout: () => void;
  setView: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ trip, onLogout, setView }) => {
  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      <header className="px-6 pt-10 pb-4 flex items-center justify-between sticky top-0 bg-background-light dark:bg-background-dark z-20 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView(View.DASHBOARD)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-sm border border-black/5 lg:hidden"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>
          <h2 className="text-2xl font-black tracking-tight lg:text-3xl">My Account</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Shift Active</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-8 space-y-10 no-scrollbar lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Driver Card */}
          <section className="flex flex-col items-center gap-8 bg-white dark:bg-card-dark p-10 rounded-[3rem] shadow-xl border border-black/5 xl:sticky xl:top-0">
            <div className="relative group">
              <img
                src="https://picsum.photos/seed/driverjohn/800"
                alt="Driver"
                className="w-48 h-48 lg:w-64 lg:h-64 rounded-[3rem] border-8 border-primary/10 shadow-2xl object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-success text-white px-6 py-2 rounded-full border-4 border-white dark:border-card-dark shadow-lg">
                <p className="text-xs font-black uppercase tracking-widest">Online</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <h1 className="text-4xl font-black mb-1">John Doe</h1>
              <p className="text-primary text-xl font-bold">Senior Fleet Officer</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="bg-black/5 dark:bg-white/5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest opacity-60">ID: #9921-X</span>
                <span className="bg-black/5 dark:bg-white/5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest opacity-60">EXP: 8Y</span>
              </div>
            </div>

            <div className="w-full h-px bg-black/5"></div>

            <button
              onClick={onLogout}
              className="w-full h-16 bg-danger text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-danger/10 hover:bg-danger/90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">logout</span>
              <span className="text-lg font-black tracking-widest uppercase">Sign Out</span>
            </button>
          </section>

          {/* Details Column */}
          <div className="xl:col-span-2 space-y-8">
            <section className="space-y-6">
              <h3 className="text-2xl font-black px-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">assignment_ind</span>
                Operational Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-card-dark rounded-[2rem] shadow-md border border-black/5 p-6 flex items-center gap-5">
                  <div className="bg-primary/10 w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl material-symbols-fill">directions_bus</span>
                  </div>
                  <div>
                    <p className="text-xl font-black leading-tight">Bus #{trip.busNumber}</p>
                    <p className="text-[#9e7e47] text-sm font-medium">Assigned Vehicle</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-[2rem] shadow-md border border-black/5 p-6 flex items-center gap-5">
                  <div className="bg-primary/10 w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl material-symbols-fill">route</span>
                  </div>
                  <div>
                    <p className="text-xl font-black leading-tight">Zone 4: North</p>
                    <p className="text-[#9e7e47] text-sm font-medium">Primary Territory</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-[2rem] shadow-md border border-black/5 p-6 flex items-center gap-5">
                  <div className="bg-primary/10 w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl material-symbols-fill">verified_user</span>
                  </div>
                  <div>
                    <p className="text-xl font-black leading-tight">Class A CDL</p>
                    <p className="text-[#9e7e47] text-sm font-medium">License Type</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-[2rem] shadow-md border border-black/5 p-6 flex items-center gap-5">
                  <div className="bg-primary/10 w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl material-symbols-fill">medical_services</span>
                  </div>
                  <div>
                    <p className="text-xl font-black leading-tight">Aug 2025</p>
                    <p className="text-[#9e7e47] text-sm font-medium">Medical Clearance</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        <div className="h-24 lg:hidden"></div>
      </main>
    </div>
  );
};

export default Profile;
