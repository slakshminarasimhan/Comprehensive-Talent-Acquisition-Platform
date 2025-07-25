export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  source: 'LinkedIn' | 'Indeed' | 'Referral' | 'Company Website' | 'Recruiter Contact' | 'Job Board';
  status: 'New' | 'Screening' | 'Interview Scheduled' | 'Interview Completed' | 'Next Round' | 'Final Round' | 'Selected' | 'Rejected' | 'Dropped Out';
  currentRound: number;
  totalRounds: number;
  experience: string;
  skills: string[];
  resume?: string;
  notes?: string;
  appliedDate: string;
  lastUpdated: string;
  interviews: Interview[];
  emailHistory: EmailRecord[];
}

export interface Interview {
  id: string;
  candidateId: string;
  round: number;
  type: 'Phone Screening' | 'Technical' | 'Behavioral' | 'Final' | 'HR Round' | 'Panel Interview';
  scheduledDate: string;
  duration: number; // in minutes
  interviewers: Interviewer[];
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled' | 'No Show';
  feedback?: string;
  rating?: number; // 1-5
  notes?: string;
  meetingLink?: string;
  location?: string;
}

export interface Interviewer {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

export interface EmailRecord {
  id: string;
  type: 'Acknowledgment' | 'Interview Invite' | 'Follow Up' | 'Reminder' | 'Rejection' | 'Selection' | 'Delay Notification';
  recipient: string;
  subject: string;
  sentDate: string;
  status: 'Sent' | 'Delivered' | 'Opened' | 'Failed';
}

export interface EmailTemplate {
  id: string;
  name: string;
  type: EmailRecord['type'];
  subject: string;
  content: string;
  variables: string[];
}

export interface PipelineStats {
  totalCandidates: number;
  newApplications: number;
  interviewsScheduled: number;
  selected: number;
  rejected: number;
  dropouts: number;
  averageTimeToHire: number;
}