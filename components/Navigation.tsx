
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  isSidebar?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isSidebar = false }) => {
  const navItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { view: View.STUDENTS, label: 'Students', icon: 'group' },
    { view: View.TRIP_STATUS, label: 'Route', icon: 'map' },
    { view: View.PROFILE, label: 'Profile', icon: 'person' },
  ];

  if (isSidebar) {
    return (
      <nav className="w-64 h-screen bg-white dark:bg-card-dark border-r border-black/5 p-6 flex flex-col z-30">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-primary p-2 rounded-xl text-white">
            <span className="material-symbols-outlined text-2xl material-symbols-fill">directions_bus</span>
          </div>
          <h1 className="text-xl font-black tracking-tight">Vidyon Driver</h1>
        </div>
        
        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button 
                key={item.view}
                onClick={() => setView(item.view)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                    : 'text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'material-symbols-fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-bold tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <p className="text-sm font-bold">Driver Online</p>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-card-dark/95 backdrop-blur-xl border-t border-black/5 px-6 pt-3 pb-8 flex justify-between items-center z-30">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button 
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary scale-110' : 'text-gray-400 opacity-60'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'material-symbols-fill' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
