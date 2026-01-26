
import React, { useState } from 'react';
import { View, Student } from '../types';

interface StudentBoardingProps {
  students: Student[];
  onToggleBoarding: (id: string) => void;
  setView: (view: View) => void;
}

const StudentBoarding: React.FC<StudentBoardingProps> = ({ students, onToggleBoarding, setView }) => {
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const boardedCount = students.filter(s => s.boarded).length;

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      <header className="sticky top-0 z-20 bg-background-light dark:bg-background-dark pt-10 px-6 pb-2 border-b border-primary/5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-2 rounded-xl text-primary lg:hidden">
              <span className="material-symbols-outlined text-3xl material-symbols-fill">group</span>
            </div>
            <div>
              <h1 className="text-2xl font-black lg:text-3xl">Student Boarding</h1>
              <p className="text-primary text-xs font-black uppercase tracking-widest">Route 42 • Morning Pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-card-dark px-6 py-3 rounded-2xl shadow-sm border border-black/5 flex items-center gap-3">
              <div className="flex flex-col text-right">
                <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Attendance</p>
                <p className="text-xl font-black text-primary">{boardedCount} / {students.length}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined font-black">fact_check</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center bg-white dark:bg-card-dark border border-black/5 rounded-[1.5rem] h-14 px-6 shadow-sm focus-within:ring-2 ring-primary/20 transition-all lg:max-w-md">
            <span className="material-symbols-outlined text-primary mr-3">search</span>
            <input
              type="text"
              placeholder="Quick search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-lg placeholder:text-primary/30"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className={`group p-6 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between ${student.boarded
                  ? 'bg-white/40 dark:bg-card-dark/40 border-success/20 opacity-90'
                  : 'bg-white dark:bg-card-dark border-black/5 shadow-lg shadow-black/5 hover:scale-[1.02] hover:shadow-xl'
                }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className={`w-20 h-20 rounded-[1.5rem] object-cover border-4 transition-all ${student.boarded ? 'grayscale border-success/20 scale-90 opacity-50' : 'border-primary/10'
                        }`}
                    />
                    {student.boarded && (
                      <div className="absolute -top-2 -right-2 bg-success text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                        <span className="material-symbols-outlined text-xl material-symbols-fill">check</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xl font-black leading-tight ${student.boarded ? 'opacity-40 line-through' : ''}`}>
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${student.boarded ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'
                        }`}>
                        {student.grade}
                      </span>
                      {student.boarded && (
                        <span className="text-[10px] font-bold text-success uppercase tracking-widest">
                          Boarded {student.boardedTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onToggleBoarding(student.id)}
                className={`w-full h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${student.boarded
                    ? 'bg-success/10 text-success border-2 border-success/20 hover:bg-success/20'
                    : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90'
                  }`}
              >
                <span className="material-symbols-outlined text-2xl material-symbols-fill">
                  {student.boarded ? 'check_circle' : 'login'}
                </span>
                {student.boarded ? 'Boarded (Unmark)' : 'Confirm Boarding'}
              </button>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 opacity-20">
            <span className="material-symbols-outlined text-9xl">person_search</span>
            <p className="mt-6 text-2xl font-black tracking-tight">No students found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentBoarding;
