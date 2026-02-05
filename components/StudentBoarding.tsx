
import React, { useState } from 'react';
import { View, Student } from '../types';

interface StudentBoardingProps {
  students: Student[];
  onToggleBoarding: (id: string) => void;
  onDrop: (id: string) => void;
  busNumber: string;
  setView: (view: View) => void;
}

const StudentBoarding: React.FC<StudentBoardingProps> = ({ students, onToggleBoarding, onDrop, busNumber, setView }) => {
  const [search, setSearch] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const boardedCount = students.filter(s => s.boarded).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="sticky top-0 z-20 bg-background-light dark:bg-background-dark pt-6 md:pt-10 px-4 md:px-8 lg:px-10 pb-2 border-b border-primary/5 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-primary/20 p-2 rounded-xl text-primary lg:hidden shrink-0">
              <span className="material-symbols-outlined text-2xl md:text-3xl material-symbols-fill">group</span>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-extrabold tracking-tight">Student Boarding</h1>
              <p className="text-black/40 dark:text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">Route 42 • Morning Pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-card-dark px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-sm border border-black/5 flex items-center gap-3 flex-1 sm:flex-none">
              <div className="flex flex-col text-right flex-1 sm:flex-none">
                <p className="text-[8px] md:text-[10px] font-bold opacity-30 uppercase tracking-widest">Attendance</p>
                <p className="text-base md:text-lg font-extrabold text-primary leading-tight">{boardedCount} / {students.length}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined font-black text-xl md:text-2xl">fact_check</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center bg-white dark:bg-card-dark border border-black/5 rounded-xl md:rounded-[1.5rem] h-12 md:h-14 px-4 md:px-6 shadow-sm focus-within:ring-2 ring-primary/20 transition-all lg:max-w-md">
            <span className="material-symbols-outlined text-primary mr-3 text-xl md:text-2xl shrink-0">search</span>
            <input
              type="text"
              placeholder="Quick search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm md:text-base font-semibold placeholder:text-black/20"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 lg:px-10 pb-32 lg:pb-10 no-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className={`group p-5 md:p-6 rounded-2xl md:rounded-[2rem] border transition-all duration-300 flex flex-col justify-between ${student.boarded
                ? 'bg-white/40 dark:bg-card-dark/40 border-success/20 opacity-90'
                : 'bg-white dark:bg-card-dark border-black/5 shadow-xl shadow-black/[0.02] hover:scale-[1.02] hover:shadow-2xl'
                }`}
            >
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] object-cover border-4 transition-all ${student.boarded ? 'grayscale border-success/20 scale-90 opacity-50' : 'border-primary/5'
                        }`}
                    />
                    {student.boarded && (
                      <div className="absolute -top-1.5 -right-1.5 bg-success text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                        <span className="material-symbols-outlined text-sm md:text-xl material-symbols-fill">check</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-base md:text-lg font-extrabold leading-tight truncate ${student.boarded ? 'opacity-40 line-through' : ''}`}>
                      {student.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className={`px-1.5 py-0.5 rounded-md text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${student.boarded ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'
                        }`}>
                        {student.grade}
                      </span>
                      {student.boarded && (
                        <span className="text-[8px] md:text-[10px] font-bold text-success uppercase tracking-widest">
                          {student.boardedTime}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === student.id ? null : student.id);
                      }}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-black/40 dark:text-white/40">more_vert</span>
                    </button>

                    {activeMenuId === student.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 md:w-56 bg-white dark:bg-[#2c241b] rounded-xl shadow-xl border border-black/5 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-1">
                        <div className="p-3 md:p-4 bg-primary/10 rounded-lg">
                          <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Parent Contact</p>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">call</span>
                            <span className="font-bold text-sm md:text-base text-[#1c160d] dark:text-[#fcfaf8]">{student.parentPhone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => !student.boarded && onToggleBoarding(student.id)}
                  disabled={student.boarded}
                  className={`flex-1 h-12 md:h-14 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${student.boarded
                    ? 'bg-success/10 text-success border border-success/20 cursor-default'
                    : 'bg-primary text-[#1c160d] shadow-lg shadow-primary/20 hover:bg-primary/90'
                    }`}
                >
                  <span className="material-symbols-outlined text-lg material-symbols-fill">
                    {student.boarded ? 'check_circle' : 'login'}
                  </span>
                  {student.boarded ? 'Boarded' : 'Confirm'}
                </button>

                <button
                  onClick={() => onDrop(student.id)}
                  disabled={!student.boarded || student.dropped}
                  className={`flex-1 h-12 md:h-14 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${student.dropped
                    ? 'bg-red-50 text-red-400 border border-red-100 cursor-default'
                    : student.boarded
                      ? 'bg-white border-2 border-red-500 text-red-500 hover:bg-red-50'
                      : 'bg-gray-100 text-gray-300 border border-transparent cursor-not-allowed'
                    }`}
                >
                  <span className="material-symbols-outlined text-lg material-symbols-fill">
                    {student.dropped ? 'no_crash' : 'logout'}
                  </span>
                  {student.dropped ? 'Dropped' : 'Drop'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 opacity-20">
            <span className="material-symbols-outlined text-6xl md:text-8xl">person_search</span>
            <p className="mt-4 md:mt-6 text-lg md:text-xl font-extrabold tracking-tight">No students found</p>
            <p className="text-xs md:text-sm font-semibold">Try adjusting your search terms</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentBoarding;
