
import React, { useEffect, useState } from 'react';
import { View, TripState } from '../types';

interface TripStatusProps {
  trip: TripState;
  boardedCount: number;
  totalStudents: number;
  onStopTrip: () => void;
  setView: (view: View) => void;
}

const TripStatus: React.FC<TripStatusProps> = ({ trip, boardedCount, totalStudents, onStopTrip, setView }) => {
  const [duration, setDuration] = useState(32);
  
  useEffect(() => {
    const timer = setInterval(() => setDuration(prev => prev + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      <header className="px-6 pt-10 pb-4 flex items-center justify-between sticky top-0 bg-background-light dark:bg-background-dark z-20 lg:px-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(View.DASHBOARD)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-sm border border-black/5 hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>
          <div>
            <h2 className="text-2xl font-black tracking-tight lg:text-3xl">Active Trip</h2>
            <p className="text-xs font-black uppercase text-primary tracking-widest">Live Monitoring</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="px-4 py-2 bg-success/10 border border-success/20 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-ping"></div>
            <span className="text-xs font-black text-success uppercase tracking-widest">GPS Online</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 lg:px-10 overflow-hidden">
        {/* Map Section - Takes 60% width on Desktop */}
        <div className="flex-[3] relative rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl h-1/2 lg:h-full group">
          <img 
            src="https://picsum.photos/seed/livemap/1600/1200" 
            alt="Live map tracking" 
            className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none"></div>
          
          <div className="absolute top-6 left-6 right-6">
            <div className="bg-white/95 dark:bg-card-dark/95 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border-l-8 border-primary flex items-center justify-between animate-in slide-in-from-top duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">pin_drop</span>
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#9e7e47] mb-0.5">Next Stop</p>
                  <p className="text-xl font-black leading-tight">{trip.nextStop}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-primary leading-none">{trip.nextStopEta}</p>
                <p className="text-[#9e7e47] text-[10px] font-black tracking-widest uppercase mt-1">{trip.distance} away</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-8 bg-primary/30 rounded-full animate-ping"></div>
              <div className="absolute -inset-4 bg-primary/50 rounded-full animate-pulse"></div>
              <div className="bg-primary p-4 rounded-[1.5rem] shadow-2xl border-4 border-white dark:border-card-dark relative z-10 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl material-symbols-fill">directions_bus</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6">
            <div className="bg-white/90 dark:bg-card-dark/90 p-3 rounded-2xl flex flex-col gap-2 shadow-xl border border-black/5">
              <button className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Panels - Takes 40% width on Desktop */}
        <div className="flex-[2] flex flex-col gap-6 lg:justify-between lg:h-full">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-6 rounded-[2rem] border border-black/5 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 w-12 h-12 flex items-center justify-center rounded-2xl text-primary animate-pulse">
                    <span className="material-symbols-outlined text-3xl material-symbols-fill">share_location</span>
                  </div>
                  <p className="text-sm font-black leading-tight lg:text-base">Live location shared</p>
                </div>
                <span className="hidden lg:block text-success text-[10px] font-black tracking-widest uppercase">Streaming</span>
              </div>
              <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-full animate-[shimmer_2s_infinite]"></div>
              </div>
              <p className="text-[10px] font-medium opacity-40 text-center">Connected to Parent Hub • 142 viewers</p>
            </div>

            <div className="bg-white dark:bg-card-dark p-6 rounded-[2rem] shadow-lg border border-black/5 grid grid-cols-2 gap-4 items-center">
              <div className="flex flex-col items-center">
                <span className="text-[#9e7e47] text-[10px] font-black tracking-widest uppercase mb-1">Students</span>
                <span className="text-3xl font-black">{boardedCount}</span>
              </div>
              <div className="flex flex-col items-center border-l border-black/5">
                <span className="text-[#9e7e47] text-[10px] font-black tracking-widest uppercase mb-1">Total</span>
                <span className="text-3xl font-black opacity-30">{totalStudents}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark p-6 rounded-[2rem] shadow-lg border border-black/5 flex-1 flex flex-col justify-around lg:flex-none lg:h-auto lg:gap-8">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                  <span className="material-symbols-outlined text-2xl">timer</span>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-1">Duration</span>
                <span className="text-2xl font-black">{duration}m</span>
              </div>
              <div className="h-12 w-px bg-black/5"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 mb-2">
                  <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-1">Speed</span>
                <span className="text-2xl font-black">{trip.speed}</span>
              </div>
              <div className="h-12 w-px bg-black/5"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mb-2">
                  <span className="material-symbols-outlined text-2xl">route</span>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-1">Route</span>
                <span className="text-2xl font-black">42</span>
              </div>
            </div>

            <button 
              onClick={onStopTrip}
              className="w-full h-24 bg-danger text-white rounded-[2rem] flex items-center justify-center gap-4 shadow-2xl shadow-danger/20 hover:bg-danger/90 active:scale-95 transition-all mt-4 lg:mt-0"
            >
              <span className="material-symbols-outlined text-5xl material-symbols-fill">stop_circle</span>
              <div className="text-left">
                <p className="text-2xl font-black tracking-widest uppercase leading-none">End Trip</p>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Submit Route Data</p>
              </div>
            </button>
          </div>
        </div>
      </main>
      <div className="h-8 lg:hidden"></div>
    </div>
  );
};

export default TripStatus;
