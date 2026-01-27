
import React from 'react';
import { View, TripState } from '../types';

interface DashboardProps {
  trip: TripState;
  boardedCount: number;
  totalStudents: number;
  onStartTrip: () => void;
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ trip, boardedCount, totalStudents, onStartTrip, setView }) => {
  const pendingCount = totalStudents - boardedCount;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="px-4 py-6 md:px-8 md:py-10 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight">Driver Dashboard</h1>
            <div className="bg-success/10 text-success px-2 py-0.5 rounded-full flex items-center gap-1.5 border border-success/20">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>
          <p className="text-black/40 dark:text-white/40 text-sm md:text-base font-semibold">Morning pickup and student monitoring</p>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold opacity-60">
          <span>Updated: 1:00:43 pm</span>
          <button
            onClick={onStartTrip}
            className="ml-2 bg-primary text-[#1c160d] px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Start Trip
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-2 md:px-8 lg:px-12 pb-32 no-scrollbar">
        {/* Today's Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white dark:bg-card-dark p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-1">Total Students</p>
                <h3 className="text-xl md:text-3xl font-extrabold leading-none">{totalStudents}</h3>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl md:text-3xl">diversity_3</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs font-semibold text-black/30 dark:text-white/30">Enrolled for this route</p>
          </div>

          <div className="bg-white dark:bg-card-dark p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-1">Boarded Today</p>
                <h3 className="text-xl md:text-3xl font-extrabold leading-none">{boardedCount}</h3>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-success/10 text-success rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl md:text-3xl">check_circle</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs font-semibold text-black/30 dark:text-white/30">Confirmed on bus</p>
          </div>

          <div className="bg-white dark:bg-card-dark p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-1">Remaining</p>
                <h3 className="text-xl md:text-3xl font-extrabold leading-none">{pendingCount}</h3>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-danger/10 text-danger rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl md:text-3xl">error</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs font-semibold text-black/30 dark:text-white/30">Pending boarding</p>
          </div>

          <div className="bg-white dark:bg-card-dark p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-1">Progress</p>
                <h3 className="text-xl md:text-3xl font-extrabold leading-none">{Math.round((boardedCount / totalStudents) * 100)}%</h3>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl md:text-3xl">trending_up</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs font-semibold text-black/30 dark:text-white/30">Of total expected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <section className="bg-white dark:bg-card-dark rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 overflow-hidden flex flex-col p-6 md:p-8">
            <div className="mb-6">
              <h4 className="text-xl font-extrabold mb-1">Boarding Analytics</h4>
              <p className="text-xs font-semibold opacity-40">Breakdown of student boarding records</p>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[250px] relative">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" className="text-black/5 dark:text-white/5" />
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - (boardedCount / totalStudents || 0))}
                    strokeLinecap="round"
                    className="text-success transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-black">{Math.round((boardedCount / totalStudents) * 100)}%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Boarded</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-success"></div>
                <span className="text-xs font-bold opacity-60">Boarded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-black/10 dark:bg-white/10"></div>
                <span className="text-xs font-bold opacity-60">Pending</span>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-card-dark rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 overflow-hidden flex flex-col p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-extrabold mb-1">Route Context</h4>
                  <p className="text-xs font-semibold opacity-40">Current trip specifics</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                  <span className="material-symbols-outlined">map</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-black/[0.02] dark:bg-white/[0.02] p-6 rounded-3xl border border-black/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Ongoing Trip</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Stop 4 / 12</span>
                </div>
                <p className="text-lg font-extrabold">Green Valley Apartments</p>
                <p className="text-xs font-semibold opacity-40 mt-1">Expected 08:45 AM • 2.4km distance</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center py-6 opacity-30">
                <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-2xl">history</span>
                </div>
                <p className="text-sm font-bold">No recent notifications</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
