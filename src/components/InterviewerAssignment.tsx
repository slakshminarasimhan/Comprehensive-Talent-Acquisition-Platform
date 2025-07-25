import React, { useState } from 'react';
import { ArrowLeft, Save, Users, Calendar, Clock, Plus, X, Search } from 'lucide-react';
import { Candidate, Interview, Interviewer } from '../types';
import { mockInterviewers } from '../data/mockData';

interface InterviewerAssignmentProps {
  candidate: Candidate;
  interview?: Interview;
  onSave: (interviewData: Partial<Interview>) => void;
  onCancel: () => void;
}

const InterviewerAssignment: React.FC<InterviewerAssignmentProps> = ({ 
  candidate, 
  interview, 
  onSave, 
  onCancel 
}) => {
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>(
    interview?.interviewers.map(i => i.id) || []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');

  const departments = [...new Set(mockInterviewers.map(i => i.department))];

  const filteredInterviewers = mockInterviewers.filter(interviewer => {
    const matchesSearch = interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interviewer.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || interviewer.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const toggleInterviewer = (interviewerId: string) => {
    setSelectedInterviewers(prev => 
      prev.includes(interviewerId)
        ? prev.filter(id => id !== interviewerId)
        : [...prev, interviewerId]
    );
  };

  const handleSave = () => {
    const selectedInterviewerObjects = mockInterviewers.filter(i => 
      selectedInterviewers.includes(i.id)
    );

    const interviewData: Partial<Interview> = {
      ...interview,
      interviewers: selectedInterviewerObjects,
      candidateId: candidate.id
    };

    onSave(interviewData);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assign Interviewers</h1>
          <p className="text-gray-600">for {candidate.name} - {candidate.position}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter Interviewers</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or role..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Selected: {selectedInterviewers.length} interviewer(s)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviewers.map(interviewer => {
            const isSelected = selectedInterviewers.includes(interviewer.id);
            
            return (
              <div
                key={interviewer.id}
                className={`bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleInterviewer(interviewer.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{interviewer.name}</h3>
                      <p className="text-sm text-gray-600">{interviewer.role}</p>
                      <p className="text-sm text-gray-500">{interviewer.department}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{interviewer.email}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        interviewer.department === 'Engineering' ? 'bg-blue-100 text-blue-800' :
                        interviewer.department === 'Product' ? 'bg-purple-100 text-purple-800' :
                        interviewer.department === 'Human Resources' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {interviewer.department}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedInterviewers.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Interviewers</h3>
            <div className="space-y-3">
              {selectedInterviewers.map(interviewerId => {
                const interviewer = mockInterviewers.find(i => i.id === interviewerId);
                if (!interviewer) return null;
                
                return (
                  <div key={interviewerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{interviewer.name}</p>
                        <p className="text-sm text-gray-600">{interviewer.role} • {interviewer.department}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleInterviewer(interviewerId)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Actions</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded" defaultChecked />
              <span className="text-sm text-gray-700">Send calendar invites to selected interviewers</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded" defaultChecked />
              <span className="text-sm text-gray-700">Block calendar slots for interview duration</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded" defaultChecked />
              <span className="text-sm text-gray-700">Send interview preparation materials</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 rounded" />
              <span className="text-sm text-gray-700">Set up automatic reminder 24 hours before</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedInterviewers.length === 0}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Assign Interviewers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewerAssignment;