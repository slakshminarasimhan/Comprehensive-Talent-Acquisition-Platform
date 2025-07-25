import React, { useState } from 'react';
import { AlertTriangle, Bell, Clock, Users, Send, Plus, X, Calendar, Mail } from 'lucide-react';
import { Candidate, Interviewer } from '../types';
import { mockCandidates, mockInterviewers } from '../data/mockData';

interface Alert {
  id: string;
  type: 'reminder' | 'delay' | 'cancellation' | 'urgent' | 'followup';
  title: string;
  message: string;
  recipients: {
    candidates: string[];
    interviewers: string[];
    others: string[];
  };
  scheduledTime: string;
  status: 'scheduled' | 'sent' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  relatedTo?: string;
}

const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Interview Reminder - John Smith',
      message: 'Technical interview scheduled for tomorrow at 2:00 PM',
      recipients: {
        candidates: ['1'],
        interviewers: ['1', '2'],
        others: ['hr@company.com']
      },
      scheduledTime: '2024-01-21T10:00:00Z',
      status: 'sent',
      priority: 'medium',
      relatedTo: 'Interview #INT-001'
    },
    {
      id: '2',
      type: 'delay',
      title: 'Interview Postponed - Maria Garcia',
      message: 'Final round interview has been postponed to next week due to interviewer unavailability',
      recipients: {
        candidates: ['2'],
        interviewers: ['3', '4'],
        others: []
      },
      scheduledTime: '2024-01-20T15:30:00Z',
      status: 'sent',
      priority: 'high',
      relatedTo: 'Interview #INT-002'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'reminder' as Alert['type'],
    title: '',
    message: '',
    selectedCandidates: [] as string[],
    selectedInterviewers: [] as string[],
    otherRecipients: '',
    scheduledTime: '',
    priority: 'medium' as Alert['priority']
  });

  const alertTypes: Alert['type'][] = ['reminder', 'delay', 'cancellation', 'urgent', 'followup'];
  const priorities: Alert['priority'][] = ['low', 'medium', 'high', 'urgent'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAlert: Alert = {
      id: Date.now().toString(),
      type: formData.type,
      title: formData.title,
      message: formData.message,
      recipients: {
        candidates: formData.selectedCandidates,
        interviewers: formData.selectedInterviewers,
        others: formData.otherRecipients.split(',').map(email => email.trim()).filter(Boolean)
      },
      scheduledTime: formData.scheduledTime,
      status: 'scheduled',
      priority: formData.priority
    };

    setAlerts(prev => [...prev, newAlert]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'reminder',
      title: '',
      message: '',
      selectedCandidates: [],
      selectedInterviewers: [],
      otherRecipients: '',
      scheduledTime: '',
      priority: 'medium'
    });
    setShowForm(false);
  };

  const toggleCandidate = (candidateId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCandidates: prev.selectedCandidates.includes(candidateId)
        ? prev.selectedCandidates.filter(id => id !== candidateId)
        : [...prev.selectedCandidates, candidateId]
    }));
  };

  const toggleInterviewer = (interviewerId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedInterviewers: prev.selectedInterviewers.includes(interviewerId)
        ? prev.selectedInterviewers.filter(id => id !== interviewerId)
        : [...prev.selectedInterviewers, interviewerId]
    }));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'delay': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'cancellation': return <X className="w-5 h-5 text-red-500" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'followup': return <Mail className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCandidateName = (candidateId: string) => {
    const candidate = mockCandidates.find(c => c.id === candidateId);
    return candidate?.name || 'Unknown Candidate';
  };

  const getInterviewerName = (interviewerId: string) => {
    const interviewer = mockInterviewers.find(i => i.id === interviewerId);
    return interviewer?.name || 'Unknown Interviewer';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Alert Center</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Alert</span>
          </button>
        </div>
        <p className="text-gray-600">Manage alerts and notifications for candidates and interviewers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              <p className="text-sm text-gray-600">Total Alerts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.status === 'sent').length}
              </p>
              <p className="text-sm text-gray-600">Sent</p>
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
                {alerts.filter(a => a.status === 'scheduled').length}
              </p>
              <p className="text-sm text-gray-600">Scheduled</p>
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
                {alerts.filter(a => a.priority === 'urgent').length}
              </p>
              <p className="text-sm text-gray-600">Urgent</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Alert History</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {alerts.map(alert => (
            <div key={alert.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{alert.message}</p>
                  
                  <div className="space-y-2">
                    {alert.recipients.candidates.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Candidates: {alert.recipients.candidates.map(getCandidateName).join(', ')}</span>
                      </div>
                    )}
                    {alert.recipients.interviewers.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Interviewers: {alert.recipients.interviewers.map(getInterviewerName).join(', ')}</span>
                      </div>
                    )}
                    {alert.recipients.others.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>Others: {alert.recipients.others.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                    <span>Scheduled: {new Date(alert.scheduledTime).toLocaleString()}</span>
                    {alert.relatedTo && (
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {alert.relatedTo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Alert</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Alert['type'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {alertTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Alert['priority'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alert Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Interview Reminder - John Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter the alert message..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Candidates
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                    {mockCandidates.map(candidate => (
                      <label key={candidate.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={formData.selectedCandidates.includes(candidate.id)}
                          onChange={() => toggleCandidate(candidate.id)}
                          className="mr-3 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                          <p className="text-xs text-gray-500">{candidate.position}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Interviewers
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                    {mockInterviewers.map(interviewer => (
                      <label key={interviewer.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={formData.selectedInterviewers.includes(interviewer.id)}
                          onChange={() => toggleInterviewer(interviewer.id)}
                          className="mr-3 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{interviewer.name}</p>
                          <p className="text-xs text-gray-500">{interviewer.role}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Recipients (Optional)
                </label>
                <input
                  type="text"
                  value={formData.otherRecipients}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherRecipients: e.target.value }))}
                  placeholder="email1@company.com, email2@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Create Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertCenter;