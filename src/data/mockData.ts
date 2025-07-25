import { Candidate, Interview, Interviewer, EmailTemplate, PipelineStats } from '../types';

export const mockInterviewers: Interviewer[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Senior Developer', department: 'Engineering' },
  { id: '2', name: 'Mike Chen', email: 'mike.c@company.com', role: 'Tech Lead', department: 'Engineering' },
  { id: '3', name: 'Emily Davis', email: 'emily.d@company.com', role: 'HR Manager', department: 'Human Resources' },
  { id: '4', name: 'Alex Rodriguez', email: 'alex.r@company.com', role: 'Product Manager', department: 'Product' },
  { id: '5', name: 'Lisa Wang', email: 'lisa.w@company.com', role: 'Engineering Manager', department: 'Engineering' }
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    position: 'Senior Frontend Developer',
    source: 'LinkedIn',
    status: 'Interview Scheduled',
    currentRound: 2,
    totalRounds: 4,
    experience: '5 years',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    appliedDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    interviews: [
      {
        id: 'int1',
        candidateId: '1',
        round: 1,
        type: 'Phone Screening',
        scheduledDate: '2024-01-18T10:00:00Z',
        duration: 30,
        interviewers: [mockInterviewers[2]],
        status: 'Completed',
        rating: 4,
        feedback: 'Good communication skills, strong technical background'
      },
      {
        id: 'int2',
        candidateId: '1',
        round: 2,
        type: 'Technical',
        scheduledDate: '2024-01-22T14:00:00Z',
        duration: 90,
        interviewers: [mockInterviewers[0], mockInterviewers[1]],
        status: 'Scheduled',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      }
    ],
    emailHistory: [
      {
        id: 'email1',
        type: 'Acknowledgment',
        recipient: 'john.smith@email.com',
        subject: 'Application Received - Senior Frontend Developer',
        sentDate: '2024-01-15T09:30:00Z',
        status: 'Opened'
      }
    ]
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1-555-0124',
    position: 'Product Manager',
    source: 'Indeed',
    status: 'Final Round',
    currentRound: 3,
    totalRounds: 3,
    experience: '7 years',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    appliedDate: '2024-01-10',
    lastUpdated: '2024-01-21',
    interviews: [
      {
        id: 'int3',
        candidateId: '2',
        round: 3,
        type: 'Final',
        scheduledDate: '2024-01-23T11:00:00Z',
        duration: 60,
        interviewers: [mockInterviewers[3], mockInterviewers[4]],
        status: 'Scheduled'
      }
    ],
    emailHistory: []
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    position: 'Backend Developer',
    source: 'Referral',
    status: 'Screening',
    currentRound: 1,
    totalRounds: 3,
    experience: '3 years',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    appliedDate: '2024-01-18',
    lastUpdated: '2024-01-19',
    interviews: [],
    emailHistory: []
  },
  {
    id: '4',
    name: 'Sarah Brown',
    email: 'sarah.brown@email.com',
    position: 'UX Designer',
    source: 'Company Website',
    status: 'Dropped Out',
    currentRound: 2,
    totalRounds: 3,
    experience: '4 years',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    appliedDate: '2024-01-12',
    lastUpdated: '2024-01-20',
    interviews: [],
    emailHistory: []
  },
  {
    id: '5',
    name: 'Robert Lee',
    email: 'robert.lee@email.com',
    position: 'DevOps Engineer',
    source: 'Job Board',
    status: 'Selected',
    currentRound: 4,
    totalRounds: 4,
    experience: '6 years',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    appliedDate: '2024-01-08',
    lastUpdated: '2024-01-21',
    interviews: [],
    emailHistory: []
  }
];

export const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Application Acknowledgment',
    type: 'Acknowledgment',
    subject: 'Application Received - {{position}}',
    content: `Dear {{candidateName}},

Thank you for your interest in the {{position}} role at our company. We have received your application and are currently reviewing it.

We will be in touch within the next few days regarding the next steps in our hiring process.

Best regards,
Recruitment Team`,
    variables: ['candidateName', 'position']
  },
  {
    id: '2',
    name: 'Interview Invitation',
    type: 'Interview Invite',
    subject: 'Interview Invitation - {{position}} - Round {{round}}',
    content: `Dear {{candidateName}},

We are pleased to invite you for a {{interviewType}} interview for the {{position}} role.

Interview Details:
- Date: {{date}}
- Time: {{time}}
- Duration: {{duration}} minutes
- Interviewer(s): {{interviewers}}
- Location/Link: {{location}}

Please confirm your availability by replying to this email.

Best regards,
Recruitment Team`,
    variables: ['candidateName', 'position', 'round', 'interviewType', 'date', 'time', 'duration', 'interviewers', 'location']
  }
];

export const pipelineStats: PipelineStats = {
  totalCandidates: 45,
  newApplications: 12,
  interviewsScheduled: 8,
  selected: 3,
  rejected: 15,
  dropouts: 4,
  averageTimeToHire: 18
};