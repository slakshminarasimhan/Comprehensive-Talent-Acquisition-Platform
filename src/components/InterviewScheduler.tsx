import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, MapPin, ArrowLeft, Plus } from 'lucide-react';
import { Candidate, Interview, Interviewer } from '../types';
import { mockInterviewers } from '../data/mockData';

interface InterviewSchedulerProps {
  candidate?: Candidate;
  onBack: () => void;
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({ candidate, onBack }) => {
  const [interviewData, setInterviewData] = useState({
    type: 'Phone Screening' as Interview['type'],
    date: '',
    time: '',
    duration: 60,
    interviewers: [] as string[],
    location: '',
    meetingLink: '',
    notes: ''
  });

  const interviewTypes: Interview['type'][] = [
    'Phone Screening',
    'Technical',
    'Behavioral',
    'Final',
    'HR Round',
    'Panel Interview'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle interview scheduling logic
    console.log('Scheduling interview:', interviewData);
  };

  const toggleInterviewer = (interviewerId: string) => {
    setInterviewData(prev => ({
      ...prev,
      interviewers: prev.interviewers.includes(interviewerId)
        ? prev.interviewers.filter(id => id !== interviewerId)
        : [...prev.interviewers, interviewerId]
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">Schedule Interview</h1>
        {candidate && (
          <p className="text-gray-600">for {candidate.name} - {candidate.position}</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Type
                </label>
                <select
                  value={interviewData.type}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, type: e.target.value as Interview['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {interviewTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <select
                  value={interviewData.duration}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={interviewData.date}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={interviewData.time}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Interviewers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockInterviewers.map(interviewer => (
                <div
                  key={interviewer.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    interviewData.interviewers.includes(interviewer.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleInterviewer(interviewer.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      interviewData.interviewers.includes(interviewer.id)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {interviewData.interviewers.includes(interviewer.id) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{interviewer.name}</p>
                      <p className="text-sm text-gray-500">{interviewer.role} • {interviewer.department}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Location & Meeting Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Location (Optional)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={interviewData.location}
                    onChange={(e) => setInterviewData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Conference Room A, Building 1"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Meeting Link (Optional)
                </label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    value={interviewData.meetingLink}
                    onChange={(e) => setInterviewData(prev => ({ ...prev, meetingLink: e.target.value }))}
                    placeholder="https://meet.google.com/..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={interviewData.notes}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any specific instructions or preparation notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Actions</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-3 rounded" defaultChecked />
                <span className="text-sm text-gray-700">Send interview invitation email to candidate</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3 rounded" defaultChecked />
                <span className="text-sm text-gray-700">Send calendar invites to all interviewers</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3 rounded" defaultChecked />
                <span className="text-sm text-gray-700">Block calendar slots for all participants</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3 rounded" defaultChecked />
                <span className="text-sm text-gray-700">Send reminder 24 hours before interview</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewScheduler;