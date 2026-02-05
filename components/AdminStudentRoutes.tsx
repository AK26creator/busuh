
import React, { useState } from 'react';
import { View as ViewType, Student } from '../types';
import { supabase } from '../supabaseClient';

interface AdminStudentRoutesProps {
    setView: (view: ViewType) => void;
    students: Student[];
    onAssignRoute: (studentId: string, busNumber: string) => void;
}

const AdminStudentRoutes: React.FC<AdminStudentRoutesProps> = ({ setView, students, onAssignRoute }) => {
    const [search, setSearch] = useState('');

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#fcfaf8] dark:bg-[#1c160d] p-4 lg:p-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => setView(ViewType.ADMIN_DASHBOARD)}
                    className="p-2 rounded-xl bg-white dark:bg-[#2b2214] border border-[#e8dfd2] dark:border-[#3d311d] hover:bg-[#f3ae3d] hover:text-white transition-colors"
                >
                    ←
                </button>
                <div>
                    <h1 className="text-[#1c160d] dark:text-[#fcfaf8] text-2xl font-bold">Student Route Assignment</h1>
                    <p className="text-[#9c7849] dark:text-[#a1824a] text-sm">Assign students to bus numbers for their daily commute.</p>
                </div>
            </div>

            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search student name or roll number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white dark:bg-[#2b2214] border border-[#e8dfd2] dark:border-[#3d311d] rounded-2xl px-6 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[#f3ae3d] transition-all dark:text-white"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50">🔍</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.map((student) => (
                    <div key={student.id} className="bg-white dark:bg-[#2b2214] p-5 rounded-3xl border border-[#e8dfd2] dark:border-[#3d311d] shadow-sm hover:border-[#f3ae3d] transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-2xl object-cover border border-[#e8dfd2] dark:border-[#3d311d]" />
                            <div>
                                <h3 className="font-bold dark:text-white leading-tight">{student.name}</h3>
                                <p className="text-[#9c7849] dark:text-[#a1824a] text-xs font-medium">{student.grade} • {student.rollNumber}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-[#9c7849] dark:text-[#a1824a] uppercase tracking-wider ml-1">Assigned Bus</label>
                                <div className="flex gap-2">
                                    <select
                                        defaultValue={student.assignedBus || ''}
                                        onChange={(e) => onAssignRoute(student.id, e.target.value)}
                                        className="flex-1 bg-[#fcfaf8] dark:bg-[#1c160d] border border-[#e8dfd2] dark:border-[#3d311d] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f3ae3d] dark:text-white"
                                    >
                                        <option value="">Unassigned</option>
                                        <option value="42">Bus 42 (Green Valley)</option>
                                        <option value="10">Bus 10 (Blue Hills)</option>
                                        <option value="15">Bus 15 (Lake Side)</option>
                                    </select>
                                    <button className="p-2 bg-[#f3ae3d]/10 text-[#f3ae3d] rounded-xl hover:bg-[#f3ae3d] hover:text-white transition-colors">
                                        ✓
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-[#9c7849] dark:text-[#a1824a] uppercase tracking-wider ml-1">Pickup Location</label>
                                <input
                                    type="text"
                                    placeholder="Enter pickup address..."
                                    defaultValue=""
                                    onChange={async (e) => {
                                        // Update pickup address in database
                                        await supabase
                                            .from('profiles')
                                            .update({ pickup_address: e.target.value })
                                            .eq('id', student.id);
                                    }}
                                    className="bg-[#fcfaf8] dark:bg-[#1c160d] border border-[#e8dfd2] dark:border-[#3d311d] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f3ae3d] dark:text-white"
                                />
                                <button
                                    onClick={() => {
                                        // Future: Open map picker modal
                                        alert('Map location picker will be implemented here. For now, you can manually update coordinates in the database.');
                                    }}
                                    className="text-xs text-[#f3ae3d] hover:underline"
                                >
                                    📍 Set on Map
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStudentRoutes;
