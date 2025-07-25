import React from 'react';
import { LayoutDashboard, Users, Calendar, Mail, Settings, BarChart3, Clock, Building, Bell, CalendarCheck, UserPlus, AlertTriangle, CalendarDays } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'interviewers', label: 'Interviewers', icon: UserPlus },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'calendar-management', label: 'Calendar Management', icon: CalendarCheck },
    { id: 'calendar-assignment', label: 'Calendar Assignment', icon: CalendarDays },
    { id: 'email', label: 'Email Center', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'alerts', label: 'Alert Center', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'interviews', label: 'Interviews', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TalentFlow</h1>
            <p className="text-sm text-gray-600">Recruitment Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;