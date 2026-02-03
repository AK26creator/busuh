
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
  { id: '1', name: 'Rahul Sharma', grade: 'Grade 4-B', rollNumber: 'R-101', boarded: false, parentPhone: '+91 98765 43210', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Priya Patel', grade: 'Grade 3-A', rollNumber: 'R-102', boarded: true, boardedTime: '7:45 AM', parentPhone: '+91 98765 43211', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Arjun Singh', grade: 'Grade 5-C', rollNumber: 'R-103', boarded: false, parentPhone: '+91 98765 43212', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Anjali Rao', grade: 'Grade 2-B', rollNumber: 'R-104', boarded: false, parentPhone: '+91 98765 43213', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Siddharth Varma', grade: 'Grade 1-A', rollNumber: 'R-105', boarded: false, parentPhone: '+91 98765 43214', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Kavita Iyer', grade: 'Grade 4-A', rollNumber: 'R-106', boarded: false, parentPhone: '+91 98765 43215', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Vikram Seth', grade: 'Grade 5-B', rollNumber: 'R-107', boarded: false, parentPhone: '+91 98765 43216', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: '8', name: 'Meera Das', grade: 'Grade 3-B', rollNumber: 'R-108', boarded: false, parentPhone: '+91 98765 43217', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: '9', name: 'Suresh Kumar', grade: 'Grade 6-A', rollNumber: 'R-109', boarded: false, parentPhone: '+91 98765 43218', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: '10', name: 'Lata Mangesh', grade: 'Grade 2-A', rollNumber: 'R-110', boarded: false, parentPhone: '+91 98765 43219', avatar: 'https://i.pravatar.cc/150?u=10' },
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
          boardedTime: isBoarding ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
          dropped: false, // Reset dropped status when toggling boarding
          droppedTime: undefined
        };
      }
      return s;
    }));
  };

  const handleDrop = (id: string) => {
    const student = students.find(s => s.id === id);
    if (student) {
      // Simulate sending notification
      console.log(`Notification sent to Institution:\n\nStudent: ${student.name}\nRoll Number: ${student.rollNumber}\nClass: ${student.grade}\nBus Number: ${trip.busNumber}\n\nStatus: DROPPED`);

      setStudents(prev => prev.map(s => {
        if (s.id === id) {
          return {
            ...s,
            dropped: true,
            droppedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return s;
      }));
    }
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
            onDrop={handleDrop}
            busNumber={trip.busNumber}
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
