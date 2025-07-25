import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CandidateList from './components/CandidateList';
import CandidateDetail from './components/CandidateDetail';
import InterviewScheduler from './components/InterviewScheduler';
import EmailCenter from './components/EmailCenter';
import Calendar from './components/Calendar';
import CandidateForm from './components/CandidateForm';
import InterviewerAssignment from './components/InterviewerAssignment';
import CalendarManagement from './components/CalendarManagement';
import NotificationCenter from './components/NotificationCenter';
import InterviewerManagement from './components/InterviewerManagement';
import AlertCenter from './components/AlertCenter';
import CalendarAssignment from './components/CalendarAssignment';
import { Candidate } from './types';
import { mockCandidates } from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [schedulerCandidate, setSchedulerCandidate] = useState<Candidate | null>(null);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [showInterviewerAssignment, setShowInterviewerAssignment] = useState(false);
  const [assignmentCandidate, setAssignmentCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setActiveView('candidate-detail');
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    setSchedulerCandidate(candidate);
    setShowScheduler(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setShowCandidateForm(true);
  };

  const handleAddCandidate = () => {
    setEditingCandidate(null);
    setShowCandidateForm(true);
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  const handleSaveCandidate = (candidateData: Partial<Candidate>) => {
    if (editingCandidate) {
      setCandidates(prev => prev.map(c => 
        c.id === editingCandidate.id ? { ...c, ...candidateData } : c
      ));
    } else {
      setCandidates(prev => [...prev, candidateData as Candidate]);
    }
    setShowCandidateForm(false);
    setEditingCandidate(null);
  };

  const handleAssignInterviewers = (candidate: Candidate) => {
    setAssignmentCandidate(candidate);
    setShowInterviewerAssignment(true);
  };

  const handleBack = () => {
    if (showInterviewerAssignment) {
      setShowInterviewerAssignment(false);
      setAssignmentCandidate(null);
    } else if (showCandidateForm) {
      setShowCandidateForm(false);
      setEditingCandidate(null);
    } else if (showScheduler) {
      setShowScheduler(false);
      setSchedulerCandidate(null);
    } else if (selectedCandidate) {
      setSelectedCandidate(null);
      setActiveView('candidates');
    }
  };

  const renderMainContent = () => {
    if (showInterviewerAssignment) {
      return (
        <InterviewerAssignment
          candidate={assignmentCandidate!}
          onSave={() => setShowInterviewerAssignment(false)}
          onCancel={handleBack}
        />
      );
    }

    if (showCandidateForm) {
      return (
        <CandidateForm
          candidate={editingCandidate}
          onSave={handleSaveCandidate}
          onCancel={handleBack}
        />
      );
    }

    if (showScheduler) {
      return <InterviewScheduler candidate={schedulerCandidate} onBack={handleBack} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'candidates':
        return (
          <CandidateList
            onSelectCandidate={handleSelectCandidate}
            onScheduleInterview={handleScheduleInterview}
            onEditCandidate={handleEditCandidate}
            onDeleteCandidate={handleDeleteCandidate}
            onAddCandidate={handleAddCandidate}
          />
        );
      case 'candidate-detail':
        return selectedCandidate ? (
          <CandidateDetail
            candidate={selectedCandidate}
            onBack={handleBack}
            onScheduleInterview={handleScheduleInterview}
            onEditCandidate={handleEditCandidate}
            onAssignInterviewers={handleAssignInterviewers}
          />
        ) : null;
      case 'calendar':
        return <Calendar />;
      case 'calendar-management':
        return <CalendarManagement />;
      case 'email':
        return <EmailCenter />;
      case 'notifications':
        return <NotificationCenter />;
      case 'interviewers':
        return <InterviewerManagement />;
      case 'alerts':
        return <AlertCenter />;
      case 'calendar-assignment':
        return <CalendarAssignment />;
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'interviews':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Management</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Interview management features coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;