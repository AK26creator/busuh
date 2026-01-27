
import React, { useState, useEffect } from 'react';
import { View, Student, TripState } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import StudentBoarding from './components/StudentBoarding';
import TripStatus from './components/TripStatus';
import Profile from './components/Profile';
import Navigation from './components/Navigation';

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Rahul Sharma', grade: 'Grade 4-B', boarded: false, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Priya Patel', grade: 'Grade 3-A', boarded: true, boardedTime: '7:45 AM', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Arjun Singh', grade: 'Grade 5-C', boarded: false, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Anjali Rao', grade: 'Grade 2-B', boarded: false, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Siddharth Varma', grade: 'Grade 1-A', boarded: false, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Kavita Iyer', grade: 'Grade 4-A', boarded: false, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Vikram Seth', grade: 'Grade 5-B', boarded: false, avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: '8', name: 'Meera Das', grade: 'Grade 3-B', boarded: false, avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: '9', name: 'Suresh Kumar', grade: 'Grade 6-A', boarded: false, avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: '10', name: 'Lata Mangesh', grade: 'Grade 2-A', boarded: false, avatar: 'https://i.pravatar.cc/150?u=10' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SPLASH);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [trip, setTrip] = useState<TripState>({
    isActive: false,
    busNumber: '42',
    route: 'Green Valley',
    nextStop: 'Green Valley Apartments',
    nextStopEta: '4 min',
    distance: '0.8 miles',
    speed: '25 mph'
  });

  useEffect(() => {
    if (currentView === View.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentView(View.LOGIN);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleLogin = () => setCurrentView(View.DASHBOARD);
  const handleStartTrip = () => {
    setTrip(prev => ({ ...prev, isActive: true, startTime: new Date() }));
    setCurrentView(View.TRIP_STATUS);
  };
  const handleStopTrip = () => {
    setTrip(prev => ({ ...prev, isActive: false }));
    setCurrentView(View.DASHBOARD);
  };
  const handleLogout = () => setCurrentView(View.LOGIN);

  const toggleBoarding = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const isBoarding = !s.boarded;
        return {
          ...s,
          boarded: isBoarding,
          boardedTime: isBoarding ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return s;
    }));
  };

  const boardedCount = students.filter(s => s.boarded).length;

  const renderView = () => {
    switch (currentView) {
      case View.SPLASH:
        return <SplashScreen />;
      case View.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case View.DASHBOARD:
        return (
          <Dashboard
            trip={trip}
            boardedCount={boardedCount}
            totalStudents={students.length}
            onStartTrip={handleStartTrip}
            setView={setCurrentView}
          />
        );
      case View.STUDENTS:
        return (
          <StudentBoarding
            students={students}
            onToggleBoarding={toggleBoarding}
            setView={setCurrentView}
          />
        );
      case View.TRIP_STATUS:
        return (
          <TripStatus
            trip={trip}
            boardedCount={boardedCount}
            totalStudents={students.length}
            onStopTrip={handleStopTrip}
            setView={setCurrentView}
          />
        );
      case View.PROFILE:
        return (
          <Profile
            trip={trip}
            onLogout={handleLogout}
            setView={setCurrentView}
          />
        );
      default:
        return <SplashScreen />;
    }
  };

  const showNav = currentView !== View.SPLASH && currentView !== View.LOGIN;

  return (
    <div className="h-[100dvh] bg-background-light dark:bg-background-dark text-[#1c160d] dark:text-[#fcfaf8] flex flex-col lg:flex-row overflow-hidden">
      {showNav && (
        <div className="hidden lg:block shrink-0">
          <Navigation currentView={currentView} setView={setCurrentView} isSidebar={true} />
        </div>
      )}
      <div className="flex-1 relative flex flex-col h-full overflow-hidden">
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] py-1 px-4 flex items-center justify-center gap-2 border-b border-amber-200/50 dark:border-amber-800/30 shrink-0">
          <span className="material-symbols-outlined text-xs">science</span>
          Mock Data Mode Enabled
        </div>
        <div className="flex-1 overflow-hidden">
          {renderView()}
        </div>
        {showNav && (
          <div className="lg:hidden shrink-0">
            <Navigation currentView={currentView} setView={setCurrentView} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
