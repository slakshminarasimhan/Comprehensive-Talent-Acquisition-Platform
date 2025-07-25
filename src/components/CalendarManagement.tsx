import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

interface CalendarSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'blocked' | 'interview' | 'meeting' | 'available';
  title?: string;
  participants?: string[];
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

const CalendarManagement: React.FC = () => {
  const [slots, setSlots] = useState<CalendarSlot[]>([
    {
      id: '1',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '10:00',
      type: 'blocked',
      title: 'Team Meeting',
      participants: ['Sarah Johnson', 'Mike Chen']
    },
    {
      id: '2',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '15:30',
      type: 'interview',
      title: 'Technical Interview - John Smith',
      participants: ['Sarah Johnson', 'Mike Chen']
    },
    {
      id: '3',
      date: '2024-01-23',
      startTime: '11:00',
      endTime: '12:00',
      type: 'interview',
      title: 'Final Interview - Maria Garcia',
      participants: ['Alex Rodriguez', 'Lisa Wang']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<CalendarSlot | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    type: 'blocked' as CalendarSlot['type'],
    title: '',
    participants: [] as string[],
    isRecurring: false,
    recurringPattern: 'weekly' as CalendarSlot['recurringPattern']
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      case 'interview': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blocked': return <AlertCircle className="w-4 h-4" />;
      case 'interview': return <Users className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'available': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSlot: CalendarSlot = {
      id: editingSlot?.id || Date.now().toString(),
      ...formData
    };

    if (editingSlot) {
      setSlots(prev => prev.map(slot => slot.id === editingSlot.id ? newSlot : slot));
    } else {
      setSlots(prev => [...prev, newSlot]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      type: 'blocked',
      title: '',
      participants: [],
      isRecurring: false,
      recurringPattern: 'weekly'
    });
    setShowForm(false);
    setEditingSlot(null);
  };

  const handleEdit = (slot: CalendarSlot) => {
    setFormData({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      type: slot.type,
      title: slot.title || '',
      participants: slot.participants || [],
      isRecurring: slot.isRecurring || false,
      recurringPattern: slot.recurringPattern || 'weekly'
    });
    setEditingSlot(slot);
    setShowForm(true);
  };

  const handleDelete = (slotId: string) => {
    if (confirm('Are you sure you want to delete this calendar slot?')) {
      setSlots(prev => prev.filter(slot => slot.id !== slotId));
    }
  };

  const bulkBlockSlots = () => {
    // Example: Block lunch time for the next week
    const today = new Date();
    const nextWeek = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        nextWeek.push({
          id: `lunch-${i}`,
          date: date.toISOString().split('T')[0],
          startTime: '12:00',
          endTime: '13:00',
          type: 'blocked' as const,
          title: 'Lunch Break',
          isRecurring: true,
          recurringPattern: 'daily' as const
        });
      }
    }
    
    setSlots(prev => [...prev, ...nextWeek]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Calendar Management</h1>
          <div className="flex space-x-3">
            <button
              onClick={bulkBlockSlots}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Bulk Block</span>
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Slot</span>
            </button>
          </div>
        </div>
        
        <p className="text-gray-600">Manage calendar availability, block time slots, and schedule interviews</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Calendar Slots</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {slots.map(slot => (
                <div key={slot.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg border ${getTypeColor(slot.type)}`}>
                        {getTypeIcon(slot.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {slot.title || `${slot.type.charAt(0).toUpperCase() + slot.type.slice(1)} Slot`}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{new Date(slot.date).toLocaleDateString()}</span>
                          <span>{slot.startTime} - {slot.endTime}</span>
                          {slot.participants && slot.participants.length > 0 && (
                            <span>{slot.participants.length} participant(s)</span>
                          )}
                          {slot.isRecurring && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                              Recurring {slot.recurringPattern}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(slot)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slot.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Slots</span>
                <span className="font-medium">{slots.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Blocked Slots</span>
                <span className="font-medium text-red-600">
                  {slots.filter(s => s.type === 'blocked').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interviews</span>
                <span className="font-medium text-blue-600">
                  {slots.filter(s => s.type === 'interview').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meetings</span>
                <span className="font-medium text-purple-600">
                  {slots.filter(s => s.type === 'meeting').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                <span className="text-sm text-gray-700">Block Next Week Lunch</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm text-gray-700">Schedule Recurring Meeting</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm text-gray-700">Find Available Slots</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingSlot ? 'Edit Calendar Slot' : 'Add Calendar Slot'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as CalendarSlot['type'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="blocked">Blocked</option>
                    <option value="interview">Interview</option>
                    <option value="meeting">Meeting</option>
                    <option value="available">Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Team Meeting, Interview with John"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                    className="mr-3 rounded"
                  />
                  <span className="text-sm text-gray-700">Recurring slot</span>
                </label>

                {formData.isRecurring && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recurring Pattern
                    </label>
                    <select
                      value={formData.recurringPattern}
                      onChange={(e) => setFormData(prev => ({ ...prev, recurringPattern: e.target.value as CalendarSlot['recurringPattern'] }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingSlot ? 'Update Slot' : 'Add Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarManagement;