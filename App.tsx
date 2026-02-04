
import React, { useState, useEffect } from 'react';
import { View, Student, TripState, UserRole } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import StudentBoarding from './components/StudentBoarding';
import TripStatus from './components/TripStatus';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import AdminDashboard from './components/AdminDashboard';
import AdminBusManagement from './components/AdminBusManagement';
import AdminStudentRoutes from './components/AdminStudentRoutes';
import { supabase } from './supabaseClient';

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Rahul Sharma', grade: 'Grade 4-B', rollNumber: 'R-101', boarded: false, parentPhone: '+91 98765 43210', avatar: 'https://i.pravatar.cc/150?u=1', institution_id: 'i1', assignedBus: '42' },
  { id: '2', name: 'Priya Patel', grade: 'Grade 3-A', rollNumber: 'R-102', boarded: true, boardedTime: '7:45 AM', parentPhone: '+91 98765 43211', avatar: 'https://i.pravatar.cc/150?u=2', institution_id: 'i1', assignedBus: '10' },
  { id: '3', name: 'Arjun Singh', grade: 'Grade 5-C', rollNumber: 'R-103', boarded: false, parentPhone: '+91 98765 43212', avatar: 'https://i.pravatar.cc/150?u=3', institution_id: 'i1', assignedBus: '' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SPLASH);
  const [role, setRole] = useState<UserRole>(UserRole.DRIVER);
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
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

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setCurrentView(View.LOGIN);
        setInstitutionId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, institution_id')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (profile) {
        const userRole = profile.role as UserRole;
        setRole(userRole);
        setInstitutionId(profile.institution_id);

        // Navigate based on role if we are on login screen
        if (currentView === View.LOGIN || currentView === View.SPLASH) {
          if (userRole === UserRole.INSTITUTION) {
            setCurrentView(View.ADMIN_DASHBOARD);
          } else {
            setCurrentView(View.DASHBOARD);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  // Splash screen effect
  useEffect(() => {
    if (currentView === View.SPLASH) {
      const timer = setTimeout(() => {
        if (!session) setCurrentView(View.LOGIN);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView, session]);

  // Fetch profiles for the institution and set up real-time subscription
  useEffect(() => {
    const fetchStudentsForInstitution = async () => {
      if (!supabase || !institutionId) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('institution_id', institutionId)
        .eq('role', 'student');

      if (data && !error) {
        const fetchedStudents: Student[] = data.map(p => ({
          id: p.id,
          name: p.full_name || 'Unnamed',
          grade: p.department || 'N/A',
          rollNumber: p.staff_id || 'N/A',
          boarded: false,
          avatar: p.image_url || `https://i.pravatar.cc/150?u=${p.id}`,
          institution_id: p.institution_id,
          assignedBus: (p as any).assignedBus || ''
        }));

        setStudents(fetchedStudents);
      }
    };

    if (institutionId && currentView !== View.SPLASH && currentView !== View.LOGIN) {
      fetchStudentsForInstitution();

      const subscription = supabase
        .channel('profiles-changes')
        .on('postgres_changes' as any, {
          event: '*',
          table: 'profiles',
          filter: `institution_id=eq.${institutionId}`
        }, () => {
          fetchStudentsForInstitution();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [institutionId, currentView]);

  const handleLogin = (selectedRole: UserRole, userSession: any) => {
    setSession(userSession);
    setRole(selectedRole);
    // Navigation and profile fetching are handled by the auth listener in useEffect
  };

  const handleStartTrip = () => {
    setTrip(prev => ({ ...prev, isActive: true, startTime: new Date() }));
    setCurrentView(View.TRIP_STATUS);
  };

  const handleStopTrip = () => {
    setTrip(prev => ({ ...prev, isActive: false }));
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView(View.LOGIN);
  };

  const toggleBoarding = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const isBoarding = !s.boarded;
        return {
          ...s,
          boarded: isBoarding,
          boardedTime: isBoarding ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
          dropped: false,
          droppedTime: undefined
        };
      }
      return s;
    }));
  };

  const handleAssignRoute = async (studentId: string, busNumber: string) => {
    // Optimistic update
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, assignedBus: busNumber };
      }
      return s;
    }));

    // Update Supabase if connected
    if (supabase) {
      await supabase
        .from('profiles')
        .update({ assignedBus: busNumber } as any)
        .eq('id', studentId);
    }

    console.log(`Assigned student ${studentId} to bus ${busNumber}`);
  };

  const handleDrop = (id: string) => {
    const student = students.find(s => s.id === id);
    if (student) {
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
      case View.ADMIN_DASHBOARD:
        return <AdminDashboard setView={setCurrentView} institutionName="Vidyon Academy" />;
      case View.ADMIN_BUSES:
        return <AdminBusManagement setView={setCurrentView} institutionId={institutionId} />;
      case View.ADMIN_STUDENTS:
        return <AdminStudentRoutes students={students} setView={setCurrentView} onAssignRoute={handleAssignRoute} />;
      default:
        return <SplashScreen />;
    }
  };

  const showNav = currentView !== View.SPLASH && currentView !== View.LOGIN;

  return (
    <div className="h-[100dvh] bg-background-light dark:bg-[#1c160d] text-[#1c160d] dark:text-[#fcfaf8] flex flex-col lg:flex-row overflow-hidden">
      {showNav && (
        <div className="hidden lg:block shrink-0">
          <Navigation currentView={currentView} setView={setCurrentView} isSidebar={true} role={role} />
        </div>
      )}
      <div className="flex-1 relative flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {renderView()}
        </div>
        {showNav && (
          <div className="lg:hidden shrink-0">
            <Navigation currentView={currentView} setView={setCurrentView} role={role} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
