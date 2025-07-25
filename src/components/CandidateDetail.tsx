import React from 'react';
import { ArrowLeft, Mail, Phone, Calendar, User, FileText, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateDetailProps {
  candidate: Candidate;
  onBack: () => void;
  onScheduleInterview: (candidate: Candidate) => void;
  onEditCandidate: (candidate: Candidate) => void;
  onAssignInterviewers: (candidate: Candidate) => void;
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({ 
  candidate, 
  onBack, 
  onScheduleInterview, 
  onEditCandidate, 
  onAssignInterviewers 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Interview Completed': return 'bg-indigo-100 text-indigo-800';
      case 'Next Round': return 'bg-orange-100 text-orange-800';
      case 'Final Round': return 'bg-red-100 text-red-800';
      case 'Selected': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-gray-100 text-gray-800';
      case 'Dropped Out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterviewStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Candidates
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
            <p className="text-gray-600">{candidate.position}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
              {candidate.status}
            </span>
            <button
              onClick={() => onEditCandidate(candidate)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => onAssignInterviewers(candidate)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Assign Interviewers</span>
            </button>
            <button
              onClick={() => onScheduleInterview(candidate)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{candidate.email}</span>
              </div>
              {candidate.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{candidate.phone}</span>
                </div>
              )}
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{candidate.experience} experience</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900">Applied on {new Date(candidate.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Interview History</h2>
            {candidate.interviews.length > 0 ? (
              <div className="space-y-4">
                {candidate.interviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getInterviewStatusIcon(interview.status)}
                        <h3 className="font-medium text-gray-900">
                          Round {interview.round}: {interview.type}
                        </h3>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Date: {new Date(interview.scheduledDate).toLocaleString()}</p>
                      <p>Duration: {interview.duration} minutes</p>
                      <p>Interviewers: {interview.interviewers.map(i => i.name).join(', ')}</p>
                      {interview.rating && (
                        <p>Rating: {interview.rating}/5</p>
                      )}
                      {interview.feedback && (
                        <p>Feedback: {interview.feedback}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No interviews scheduled yet.</p>
            )}
          </div>

          {candidate.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
              <p className="text-gray-700">{candidate.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium text-gray-900">{candidate.source}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Round</p>
                <p className="font-medium text-gray-900">{candidate.currentRound} of {candidate.totalRounds}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">{new Date(candidate.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Email History</h2>
            {candidate.emailHistory.length > 0 ? (
              <div className="space-y-3">
                {candidate.emailHistory.map((email) => (
                  <div key={email.id} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm font-medium text-gray-900">{email.subject}</p>
                    <p className="text-xs text-gray-500">{email.type} • {new Date(email.sentDate).toLocaleDateString()}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      email.status === 'Opened' ? 'bg-green-100 text-green-800' :
                      email.status === 'Delivered' ? 'bg-blue-100 text-blue-800' :
                      email.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {email.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No emails sent yet.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-700">Send Email</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-700">Add Note</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-700">View Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;