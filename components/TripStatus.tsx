
import React, { useEffect, useState } from 'react';
import { View, TripState } from '../types';
import DriverMapView from './DriverMapView';

interface TripStatusProps {
  trip: TripState;
  boardedCount: number;
  totalStudents: number;
  onStopTrip: () => void;
  setView: (view: View) => void;
  institutionId?: string | null;
}

const TripStatus: React.FC<TripStatusProps> = ({ trip, boardedCount, totalStudents, onStopTrip, setView, institutionId }) => {
  const [duration, setDuration] = useState(32);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDuration(prev => prev + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Detect dark mode
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="px-4 py-6 md:px-8 md:py-10 lg:px-12 flex items-center justify-between sticky top-0 bg-background-light dark:bg-background-dark z-20 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setView(View.DASHBOARD)}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-sm border border-black/5 hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">arrow_back_ios</span>
          </button>
          <div>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold tracking-tight">Active Trip</h2>
            <p className="text-[10px] md:text-xs font-bold uppercase text-primary tracking-widest">Live Monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 md:px-5 md:py-2.5 bg-success/10 border border-success/20 rounded-xl flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-success rounded-full animate-ping"></div>
            <span className="text-[9px] md:text-xs font-bold text-success uppercase tracking-widest">GPS Live</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 lg:px-12 gap-4 md:gap-8 lg:gap-10 overflow-hidden">
        {/* Map Section */}
        <div className="flex-[3] relative rounded-2xl md:rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl h-[45%] md:h-[50%] lg:h-full group shrink-0 lg:shrink">
          <DriverMapView
            busNumber={trip.busNumber}
            institutionId={institutionId || null}
            isDark={isDark}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none"></div>

          <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8">
            <div className="bg-white/95 dark:bg-card-dark/95 backdrop-blur-2xl p-4 md:p-8 rounded-xl md:rounded-[2.5rem] shadow-2xl border-l-4 md:border-l-8 border-primary flex items-center justify-between animate-in slide-in-from-top duration-500">
              <div className="flex items-center gap-4 md:gap-6 min-w-0">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-3xl flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl md:text-4xl">pin_drop</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-1">Next Stop</p>
                  <p className="text-sm md:text-xl font-extrabold leading-tight truncate tracking-tight">{trip.nextStop}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl md:text-3xl font-extrabold text-primary leading-none tracking-tight">{trip.nextStopEta}</p>
                <p className="text-black/30 dark:text-white/30 text-[8px] md:text-[10px] font-bold tracking-widest uppercase mt-1.5">{trip.distance} away</p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-6 md:-inset-10 bg-primary/30 rounded-full animate-ping"></div>
              <div className="bg-primary p-3 md:p-6 rounded-xl md:rounded-3xl shadow-2xl border-2 md:border-4 border-white dark:border-card-dark relative z-10 text-[#1c160d] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl md:text-4xl material-symbols-fill">directions_bus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Panels */}
        <div className="flex-[2] flex flex-col gap-6 md:gap-8 lg:justify-between h-full overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            <div className="bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl text-primary animate-pulse">
                    <span className="material-symbols-outlined text-2xl md:text-3xl material-symbols-fill">share_location</span>
                  </div>
                  <p className="text-xs md:text-base font-extrabold leading-tight tracking-tight">Live location shared</p>
                </div>
              </div>
              <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-full animate-shimmer"></div>
              </div>
              <p className="text-[9px] md:text-xs font-semibold opacity-40 text-center">Connected to Parent Hub • 142 viewers</p>
            </div>

            <div className="bg-white dark:bg-card-dark p-6 md:p-8 rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 grid grid-cols-2 gap-4 items-center">
              <div className="flex flex-col items-center">
                <span className="text-black/40 text-[9px] md:text-xs font-bold tracking-widest uppercase mb-2">Boarded</span>
                <span className="text-2xl md:text-4xl font-extrabold tracking-tight">{boardedCount}</span>
              </div>
              <div className="flex flex-col items-center border-l border-black/5">
                <span className="text-black/40 text-[9px] md:text-xs font-bold tracking-widest uppercase mb-2">Total</span>
                <span className="text-2xl md:text-4xl font-extrabold tracking-tight opacity-20">{totalStudents}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark p-6 md:p-8 rounded-[2rem] shadow-xl shadow-black/[0.02] border border-black/5 flex flex-col gap-8">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-500 mb-3">
                  <span className="material-symbols-outlined text-xl md:text-3xl">timer</span>
                </div>
                <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1.5">Trip Time</span>
                <span className="text-lg md:text-2xl font-extrabold tracking-tight">{duration}m</span>
              </div>
              <div className="h-10 md:h-16 w-px bg-black/5"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-orange-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-orange-500 mb-3">
                  <span className="material-symbols-outlined text-xl md:text-3xl">speed</span>
                </div>
                <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1.5">Avg Speed</span>
                <span className="text-lg md:text-2xl font-extrabold tracking-tight">{trip.speed}</span>
              </div>
            </div>

            <button
              onClick={onStopTrip}
              className="w-full h-20 md:h-28 bg-danger text-white rounded-2xl md:rounded-[2.5rem] flex items-center justify-center gap-4 md:gap-6 shadow-2xl shadow-danger/20 hover:bg-danger/90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-3xl md:text-5xl material-symbols-fill">stop_circle</span>
              <div className="text-left">
                <p className="text-lg md:text-2xl font-extrabold tracking-tight uppercase leading-none">End Trip</p>
                <p className="text-[9px] md:text-xs font-bold opacity-70 uppercase tracking-widest mt-1.5">Submit Route Data</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripStatus;
