
import React, { useState } from 'react';
import { View as ViewType, Bus } from '../types';

interface AdminBusManagementProps {
    setView: (view: ViewType) => void;
    institutionId: string;
}

const MOCK_BUSES: Bus[] = [
    { id: 'b1', busNumber: '42', route: 'Green Valley', institution_id: 'i1', status: 'active' },
    { id: 'b2', busNumber: '10', route: 'Blue Hills', institution_id: 'i1', status: 'active' },
    { id: 'b3', busNumber: '15', route: 'Lake Side', institution_id: 'i1', status: 'inactive' },
];

const AdminBusManagement: React.FC<AdminBusManagementProps> = ({ setView, institutionId }) => {
    const [buses, setBuses] = useState<Bus[]>(MOCK_BUSES);

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
                    <h1 className="text-[#1c160d] dark:text-[#fcfaf8] text-2xl font-bold">Bus Fleet</h1>
                    <p className="text-[#9c7849] dark:text-[#a1824a] text-sm">Manage buses for Institution ID: {institutionId}</p>
                </div>
                <button className="ml-auto px-6 py-2 bg-[#f3ae3d] text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                    + Add Bus
                </button>
            </div>

            <div className="bg-white dark:bg-[#2b2214] rounded-3xl border border-[#e8dfd2] dark:border-[#3d311d] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-[#fcfaf8] dark:bg-[#211a0f] border-b border-[#e8dfd2] dark:border-[#3d311d]">
                        <tr>
                            <th className="px-6 py-4 text-[#9c7849] dark:text-[#a1824a] font-bold text-sm">Bus Number</th>
                            <th className="px-6 py-4 text-[#9c7849] dark:text-[#a1824a] font-bold text-sm">Route</th>
                            <th className="px-6 py-4 text-[#9c7849] dark:text-[#a1824a] font-bold text-sm">Status</th>
                            <th className="px-6 py-4 text-[#9c7849] dark:text-[#a1824a] font-bold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8dfd2] dark:divide-[#3d311d]">
                        {buses.map((bus) => (
                            <tr key={bus.id} className="hover:bg-[#fcfaf8]/50 dark:hover:bg-[#211a0f]/50 transition-colors">
                                <td className="px-6 py-4 font-bold dark:text-white">{bus.busNumber}</td>
                                <td className="px-6 py-4 text-[#6b502e] dark:text-[#b0946b]">{bus.route}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-full font-medium ${bus.status === 'active'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {bus.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#f3ae3d] font-bold hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBusManagement;
