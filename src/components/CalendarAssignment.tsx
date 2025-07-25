import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Search, Save, X, User, CheckCircle } from 'lucide-react';
import { Interviewer, Candidate } from '../types';
import { mockInterviewers, mockCandidates } from '../data/mockData';

interface CalendarSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'available' | 'blocked' | 'interview' | 'meeting';
  assignedInterviewers: string[];
  assignedCandidates: string[];
  title?: string;
  notes?: string;
}

const CalendarAssignment: React.FC = () => {
  const [slots, setSlots] = useState<CalendarSlot[]>([
    {
      id: '1',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '10:00',
      type: 'available',
      assignedInterviewers: ['1', '2'],
      assignedCandidates: [],
      title: 'Available for Technical Interviews'
    },
    {
      id: '2',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '15:30',
      type: 'interview',
      assignedInterviewers: ['1', '2'],
      assignedCandidates: ['1'],
      title: 'Technical Interview - John Smith'
    },
    {
      id: '3',
      date: '2024-01-23',
      startTime: '11:00',
      endTime: '12:00',
      type: 'interview',
      assignedInterviewers: ['3', '4'],
      assignedCandidates: ['2'],
      title: 'Final Interview - Maria Garcia'
    }
  ]);

  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const [assignmentData, setAssignmentData] = useState({
    selectedInterviewers: [] as string[],
    selectedCandidates: [] as string[],
    notes: ''
  });

  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slot.date.includes(searchTerm);
    const matchesType = filterType === 'All' || slot.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAssignSlot = (slot: CalendarSlot) => {
    setSelectedSlot(slot);
    setAssignmentData({
      selectedInterviewers: slot.assignedInterviewers,
      selectedCandidates: slot.assignedCandidates,
      notes: slot.notes || ''
    });
    setShowAssignmentModal(true);
  };

  const toggleInterviewer = (interviewerId: string) => {
    setAssignmentData(prev => ({
      ...prev,
      selectedInterviewers: prev.selectedInterviewers.includes(interviewerId)
        ? prev.selectedInterviewers.filter(id => id !== interviewerId)
        : [...prev.selectedInterviewers, interviewerId]
    }));
  };

  const toggleCandidate = (candidateId: string) => {
    setAssignmentData(prev => ({
      ...prev,
      selectedCandidates: prev.selectedCandidates.includes(candidateId)
        ? prev.selectedCandidates.filter(id => id !== candidateId)
        : [...prev.selectedCandidates, candidateId]
    }));
  };

  const handleSaveAssignment = () => {
    if (!selectedSlot) return;

    setSlots(prev => prev.map(slot => 
      slot.id === selectedSlot.id 
        ? {
            ...slot,
            assignedInterviewers: assignmentData.selectedInterviewers,
            assignedCandidates: assignmentData.selectedCandidates,
            notes: assignmentData.notes
          }
        : slot
    ));

    setShowAssignmentModal(false);
    setSelectedSlot(null);
  };

  const getSlotTypeColor = (type: string) => {
    switch (type) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      case 'interview': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInterviewerName = (interviewerId: string) => {
    const interviewer = mockInterviewers.find(i => i.id === interviewerId);
    return interviewer?.name || 'Unknown';
  };

  const getCandidateName = (candidateId: string) => {
    const candidate = mockCandidates.find(c => c.id === candidateId);
    return candidate?.name || 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Calendar Assignment</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create Slot</span>
          </button>
        </div>
        <p className="text-gray-600">Assign interviewers and candidates to calendar slots</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search slots..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="available">Available</option>
          <option value="blocked">Blocked</option>
          <option value="interview">Interview</option>
          <option value="meeting">Meeting</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSlots.map(slot => (
          <div key={slot.id} className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-shadow ${getSlotTypeColor(slot.type)}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{slot.title || 'Untitled Slot'}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(slot.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-3 mr-1" />
                  <span>{slot.startTime} - {slot.endTime}</span>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSlotTypeColor(slot.type)}`}>
                {slot.type}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Assigned Interviewers:</p>
                {slot.assignedInterviewers.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {slot.assignedInterviewers.map(interviewerId => (
                      <span key={interviewerId} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {getInterviewerName(interviewerId)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No interviewers assigned</p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Assigned Candidates:</p>
                {slot.assignedCandidates.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {slot.assignedCandidates.map(candidateId => (
                      <span key={candidateId} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        {getCandidateName(candidateId)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No candidates assigned</p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleAssignSlot(slot)}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Manage Assignments</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAssignmentModal && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Assign to: {selectedSlot.title}
                </h2>
                <button
                  onClick={() => setShowAssignmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">
                {new Date(selectedSlot.date).toLocaleDateString()} • {selectedSlot.startTime} - {selectedSlot.endTime}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Interviewers</h3>
                  <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
                    {mockInterviewers.map(interviewer => (
                      <label key={interviewer.id} className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <input
                          type="checkbox"
                          checked={assignmentData.selectedInterviewers.includes(interviewer.id)}
                          onChange={() => toggleInterviewer(interviewer.id)}
                          className="mr-3 rounded"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{interviewer.name}</p>
                            <p className="text-xs text-gray-500">{interviewer.role} • {interviewer.department}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Candidates</h3>
                  <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
                    {mockCandidates.map(candidate => (
                      <label key={candidate.id} className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <input
                          type="checkbox"
                          checked={assignmentData.selectedCandidates.includes(candidate.id)}
                          onChange={() => toggleCandidate(candidate.id)}
                          className="mr-3 rounded"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                            <p className="text-xs text-gray-500">{candidate.position} • {candidate.status}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={assignmentData.notes}
                  onChange={(e) => setAssignmentData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about this assignment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Assignment Summary</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Interviewers: {assignmentData.selectedInterviewers.length} selected</p>
                  <p>Candidates: {assignmentData.selectedCandidates.length} selected</p>
                  <p>Slot Type: {selectedSlot.type}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignment}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Assignment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarAssignment;