import React, { useState } from 'react';
import { Bell, Mail, Calendar, AlertTriangle, CheckCircle, Clock, Users, Send, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'reminder' | 'delay' | 'update' | 'alert' | 'success';
  title: string;
  message: string;
  timestamp: string;
  recipients: string[];
  status: 'sent' | 'pending' | 'failed';
  relatedTo?: string;
}

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'templates' | 'settings'>('notifications');
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Interview Reminder',
      message: 'Technical interview with John Smith scheduled for tomorrow at 2:00 PM',
      timestamp: '2024-01-21T10:00:00Z',
      recipients: ['sarah.j@company.com', 'mike.c@company.com', 'john.smith@email.com'],
      status: 'sent',
      relatedTo: 'Interview #INT-001'
    },
    {
      id: '2',
      type: 'delay',
      title: 'Interview Delayed',
      message: 'Final round interview with Maria Garcia has been postponed to next week',
      timestamp: '2024-01-20T15:30:00Z',
      recipients: ['maria.garcia@email.com', 'alex.r@company.com', 'lisa.w@company.com'],
      status: 'sent',
      relatedTo: 'Interview #INT-002'
    },
    {
      id: '3',
      type: 'update',
      title: 'Candidate Status Update',
      message: 'David Wilson has been moved to the next round',
      timestamp: '2024-01-19T14:15:00Z',
      recipients: ['hr@company.com'],
      status: 'sent',
      relatedTo: 'Candidate #CAN-003'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Candidate Dropout',
      message: 'Sarah Brown has withdrawn from the UX Designer position',
      timestamp: '2024-01-20T09:45:00Z',
      recipients: ['hr@company.com', 'hiring.manager@company.com'],
      status: 'sent',
      relatedTo: 'Candidate #CAN-004'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'delay': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'update': return <Bell className="w-5 h-5 text-purple-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'bg-blue-100 text-blue-800';
      case 'delay': return 'bg-orange-100 text-orange-800';
      case 'update': return 'bg-purple-100 text-purple-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Notification Center</h1>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'notifications'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.status === 'sent').length}
                  </p>
                  <p className="text-sm text-gray-600">Sent Today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.type === 'alert').length}
                  </p>
                  <p className="text-sm text-gray-600">Alerts</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.reduce((acc, n) => acc + n.recipients.length, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Recipients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {notifications.map(notification => (
                <div key={notification.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{notification.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{notification.message}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                          <span>{notification.recipients.length} recipient(s)</span>
                          {notification.relatedTo && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {notification.relatedTo}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            View Details
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">
                            Resend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Notification Templates</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Send className="w-4 h-4" />
              <span>New Template</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: 'reminder', title: 'Interview Reminder', description: 'Automated reminder sent 24 hours before interview' },
              { type: 'delay', title: 'Interview Delay Notice', description: 'Notification when interviews are rescheduled' },
              { type: 'update', title: 'Status Update', description: 'Candidate status change notifications' },
              { type: 'alert', title: 'Dropout Alert', description: 'Alert when candidates withdraw from process' }
            ].map((template, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {getNotificationIcon(template.type)}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{template.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Interview reminders</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Candidate status updates</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Interview delays/cancellations</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Candidate dropouts</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Reminder Timing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Reminder
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="24">24 hours before</option>
                      <option value="12">12 hours before</option>
                      <option value="6">6 hours before</option>
                      <option value="2">2 hours before</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-up Reminder
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="1">1 day after</option>
                      <option value="3">3 days after</option>
                      <option value="7">1 week after</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Default Recipients</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HR Team
                    </label>
                    <input
                      type="email"
                      placeholder="hr@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hiring Manager
                    </label>
                    <input
                      type="email"
                      placeholder="hiring.manager@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;