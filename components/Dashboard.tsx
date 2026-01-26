
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
  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      <header className="px-6 pt-10 pb-4 flex items-center justify-between sticky top-0 bg-background-light dark:bg-background-dark z-10 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-2.5 rounded-xl text-primary lg:hidden">
            <span className="material-symbols-outlined text-3xl material-symbols-fill">directions_bus</span>
          </div>
          <div>
            <h1 className="text-2xl font-black leading-none lg:text-4xl">Bus #{trip.busNumber}</h1>
            <p className="text-sm font-medium opacity-60 lg:text-lg">Route: {trip.route}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right mr-4">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Weather</p>
            <p className="text-sm font-bold">Sunny, 24°C</p>
          </div>
          <button className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-sm border border-black/5">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-6 pb-32 no-scrollbar lg:px-10 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
          <section className="bg-white dark:bg-card-dark rounded-3xl shadow-md border border-black/5 overflow-hidden flex flex-col">
            <div className="h-44 md:h-64 w-full relative">
              <img
                src="https://picsum.photos/seed/map42/1200/600"
                alt="Route map"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-6 lg:p-10 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black tracking-widest uppercase opacity-40">Current Status</span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase">Ready to depart</span>
                </div>
              </div>
              <h2 className="text-2xl font-black mb-2 lg:text-3xl">Ready for Pickup</h2>
              <p className="text-[#9e7e47] text-sm font-medium leading-relaxed lg:text-base">
                Your morning route to {trip.route} School is scheduled for 07:30 AM.
                All parent tracking notifications are enabled.
              </p>

              <div className="mt-8">
                <button
                  onClick={onStartTrip}
                  className="w-full lg:w-auto lg:px-12 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-white"
                >
                  <span className="material-symbols-outlined text-4xl material-symbols-fill">play_arrow</span>
                  <span className="text-xl font-black tracking-wider uppercase">Start Morning Trip</span>
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center rounded-2xl text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined text-4xl">group</span>
              </div>
              <div className="mt-10">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-1">Total Students</p>
                <p className="text-5xl font-black">{totalStudents}</p>
                <button
                  onClick={() => setView(View.STUDENTS)}
                  className="mt-4 text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1"
                >
                  View List <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="bg-green-100 dark:bg-green-900/30 w-14 h-14 flex items-center justify-center rounded-2xl text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined text-4xl">how_to_reg</span>
              </div>
              <div className="mt-10">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-1">Boarded Today</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black">{boardedCount}</p>
                  <p className="text-xl font-bold opacity-30">/ {totalStudents}</p>
                </div>
                <div className="mt-4 w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success transition-all duration-700"
                    style={{ width: `${(boardedCount / totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark p-6 rounded-3xl shadow-sm border border-black/5 md:col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-2xl text-primary">
                  <span className="material-symbols-outlined text-3xl">route</span>
                </div>
                <div>
                  <p className="font-black">Next Planned Stop</p>
                  <p className="text-sm opacity-60">Green Valley Apartments</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-primary">07:45 AM</p>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Scheduled</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
