
import React from 'react';
import { View, UserRole } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  isSidebar?: boolean;
  role?: UserRole;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isSidebar = false, role = UserRole.DRIVER }) => {
  const driverNavItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { view: View.STUDENTS, label: 'Students', icon: 'group' },
    { view: View.TRIP_STATUS, label: 'Route', icon: 'map' },
    { view: View.PROFILE, label: 'Profile', icon: 'person' },
  ];

  const adminNavItems = [
    { view: View.ADMIN_DASHBOARD, label: 'Admin Home', icon: 'admin_panel_settings' },
    { view: View.ADMIN_BUSES, label: 'Manage Buses', icon: 'directions_bus' },
    { view: View.ADMIN_STUDENTS, label: 'Student Routes', icon: 'assignment_ind' },
    { view: View.PROFILE, label: 'Profile', icon: 'person' },
  ];

  const navItems = role === UserRole.INSTITUTION ? adminNavItems : driverNavItems;

  if (isSidebar) {
    return (
      <nav className="w-64 h-full bg-white dark:bg-[#1c160d] border-r border-[#e8dfd2] dark:border-[#3d311d] p-6 flex flex-col z-30 overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-3 mb-10 px-2 text-[#f3ae3d]">
          <div className="bg-[#f3ae3d]/10 p-2 rounded-xl shrink-0">
            <span className="material-symbols-outlined text-2xl material-symbols-fill">
              {role === UserRole.INSTITUTION ? 'school' : 'directions_bus'}
            </span>
          </div>
          <h1 className="text-xl font-black tracking-tight truncate text-[#1a160f] dark:text-white">
            {role === UserRole.INSTITUTION ? 'Vidyon Admin' : 'Vidyon Driver'}
          </h1>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${isActive
                  ? 'bg-[#f3ae3d] text-[#1c160d] shadow-lg shadow-[#f3ae3d]/20 scale-[1.02]'
                  : 'text-[#9c7849] dark:text-[#a1824a] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'material-symbols-fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-extrabold tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-[#f3ae3d]/5 rounded-2xl border border-[#f3ae3d]/10 shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f3ae3d] opacity-60 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-extrabold truncate dark:text-white">
              {role === UserRole.INSTITUTION ? 'Institution Active' : 'Driver Online'}
            </p>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1c160d]/95 backdrop-blur-xl border-t border-[#e8dfd2] dark:border-[#3d311d] px-6 pt-3 pb-8 md:pb-6 flex justify-between items-center z-30 safe-bottom">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-[#f3ae3d]' : 'text-[#9c7849] dark:text-[#a1824a]'
              }`}
          >
            <span className={`material-symbols-outlined text-[26px] ${isActive ? 'material-symbols-fill' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
