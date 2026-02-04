
import React from 'react';
import { View as ViewType } from '../types';

interface AdminDashboardProps {
    setView: (view: ViewType) => void;
    institutionName: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView, institutionName }) => {
    return (
        <div className="flex flex-col h-full bg-[#fcfaf8] dark:bg-[#1c160d] p-4 lg:p-6 overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-[#1c160d] dark:text-[#fcfaf8] text-2xl lg:text-3xl font-bold">
                    {institutionName} Dashboard
                </h1>
                <p className="text-[#9c7849] dark:text-[#a1824a] text-sm">
                    Overview of your institution's transportation system
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Active Buses', value: '12', icon: '🚌', color: 'bg-blue-100 text-blue-600' },
                    { label: 'Total Students', value: '450', icon: '👥', color: 'bg-green-100 text-green-600' },
                    { label: 'Alerts', value: '2', icon: '⚠️', color: 'bg-red-100 text-red-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#2b2214] p-6 rounded-2xl shadow-sm border border-[#e8dfd2] dark:border-[#3d311d]">
                        <div className="flex items-center justify-between mb-2">
                            <span className={`p-2 rounded-lg text-xl ${stat.color}`}>{stat.icon}</span>
                            <span className="text-2xl font-bold dark:text-white">{stat.value}</span>
                        </div>
                        <p className="text-[#9c7849] dark:text-[#a1824a] text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-[#2b2214] rounded-2xl shadow-sm border border-[#e8dfd2] dark:border-[#3d311d] overflow-hidden mb-8 h-[400px] flex flex-col">
                <div className="p-4 border-b border-[#e8dfd2] dark:border-[#3d311d] flex items-center justify-between">
                    <h2 className="font-bold dark:text-white">Live Bus Tracking</h2>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs text-green-500">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Live
                        </span>
                    </div>
                </div>
                <div className="flex-1 bg-[#f0f0f0] dark:bg-[#3d311d] relative flex items-center justify-center">
                    {/* Placeholder for Map */}
                    <div className="text-center p-8">
                        <div className="text-4xl mb-4">🗺️</div>
                        <p className="text-[#9c7849] dark:text-[#a1824a] text-sm max-w-xs mx-auto">
                            Interactive Map Integration (Leaflet/Google Maps) will display buses for ID: {institutionName}
                        </p>
                        <button className="mt-4 px-6 py-2 bg-[#f3ae3d] text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                            Initialize Map
                        </button>
                    </div>

                    {/* Mock Bus Markers */}
                    <div className="absolute top-1/4 left-1/3 p-2 bg-white dark:bg-[#2b2214] rounded-lg shadow-lg border border-[#f3ae3d] text-xs font-bold animate-bounce cursor-pointer">
                        🚌 Bus 42
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 p-2 bg-white dark:bg-[#2b2214] rounded-lg shadow-lg border border-[#f3ae3d] text-xs font-bold animate-bounce cursor-pointer" style={{ animationDelay: '0.5s' }}>
                        🚌 Bus 10
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <button
                    onClick={() => setView(ViewType.ADMIN_BUSES)}
                    className="group relative overflow-hidden bg-white dark:bg-[#2b2214] p-8 rounded-3xl border border-[#e8dfd2] dark:border-[#3d311d] text-left hover:border-[#f3ae3d] transition-all"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🚍</div>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Bus Fleet Management</h3>
                        <p className="text-[#9c7849] dark:text-[#a1824a] text-sm">Add, remove, or monitor your institution's buses.</p>
                    </div>
                    <div className="absolute top-0 right-0 p-8 text-4xl opacity-5 group-hover:opacity-10 transition-opacity">🚌</div>
                </button>

                <button
                    onClick={() => setView(ViewType.ADMIN_STUDENTS)}
                    className="group relative overflow-hidden bg-white dark:bg-[#2b2214] p-8 rounded-3xl border border-[#e8dfd2] dark:border-[#3d311d] text-left hover:border-[#f3ae3d] transition-all"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🎓</div>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Student Route Assignment</h3>
                        <p className="text-[#9c7849] dark:text-[#a1824a] text-sm">Assign students to specific routes and bus numbers.</p>
                    </div>
                    <div className="absolute top-0 right-0 p-8 text-4xl opacity-5 group-hover:opacity-10 transition-opacity">👨‍🎓</div>
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
