import React from 'react';
import { Users, Calendar, CheckCircle, XCircle, UserMinus, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { pipelineStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Candidates', value: pipelineStats.totalCandidates, icon: Users, color: 'bg-blue-500', change: '+8%' },
    { label: 'New Applications', value: pipelineStats.newApplications, icon: TrendingUp, color: 'bg-green-500', change: '+15%' },
    { label: 'Interviews Scheduled', value: pipelineStats.interviewsScheduled, icon: Calendar, color: 'bg-purple-500', change: '+3%' },
    { label: 'Selected', value: pipelineStats.selected, icon: CheckCircle, color: 'bg-emerald-500', change: '+2' },
    { label: 'Rejected', value: pipelineStats.rejected, icon: XCircle, color: 'bg-red-500', change: '+5' },
    { label: 'Dropouts', value: pipelineStats.dropouts, icon: UserMinus, color: 'bg-orange-500', change: '+1' },
    { label: 'Avg. Time to Hire', value: `${pipelineStats.averageTimeToHire} days`, icon: Clock, color: 'bg-indigo-500', change: '-2 days' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruitment Dashboard</h1>
        <p className="text-gray-600">Overview of your talent acquisition pipeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center text-sm">
                  {stat.change.includes('%') || stat.change.includes('days') ? (
                    stat.change.startsWith('+') ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )
                  ) : null}
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pipeline Overview</h2>
          <div className="space-y-4">
            {[
              { stage: 'New Applications', count: 12, color: 'bg-blue-500' },
              { stage: 'Screening', count: 8, color: 'bg-yellow-500' },
              { stage: 'Interview Scheduled', count: 6, color: 'bg-purple-500' },
              { stage: 'Final Round', count: 4, color: 'bg-orange-500' },
              { stage: 'Selected', count: 3, color: 'bg-green-500' },
            ].map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${stage.color} mr-3`}></div>
                  <span className="text-gray-700">{stage.stage}</span>
                </div>
                <span className="font-semibold text-gray-900">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Interview scheduled', candidate: 'John Smith', time: '2 hours ago', type: 'scheduled' },
              { action: 'New application received', candidate: 'Emma Johnson', time: '4 hours ago', type: 'new' },
              { action: 'Interview completed', candidate: 'Mike Wilson', time: '1 day ago', type: 'completed' },
              { action: 'Candidate selected', candidate: 'Sarah Davis', time: '2 days ago', type: 'selected' },
              { action: 'Follow-up sent', candidate: 'David Brown', time: '2 days ago', type: 'followup' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'scheduled' ? 'bg-purple-500' :
                  activity.type === 'new' ? 'bg-blue-500' :
                  activity.type === 'completed' ? 'bg-yellow-500' :
                  activity.type === 'selected' ? 'bg-green-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span> - {activity.candidate}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;