// src/pages/Requests.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navbar } from '../components/shared/Navbar';
import { RequestFormModal } from '../components/modals/RequestFormModal';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Clock, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import { Request } from '../types';

// Mock data
const mockRequests: Request[] = [
  {
    id: '1',
    studentId: '2',
    studentName: 'Maya Rodriguez',
    type: 'food',
    title: 'Weekly Groceries',
    description: 'Looking for help with basic groceries for the week. Would appreciate any support with fresh produce and pantry items.',
    urgency: 'high',
    status: 'pending',
    createdAt: new Date().toISOString(),
    items: ['Fresh vegetables', 'Pasta', 'Rice', 'Protein sources'],
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Maya Rodriguez',
    type: 'money',
    title: 'Textbook Funds',
    description: 'Need help purchasing required textbooks for this semester. The total cost is around KSH200.',
    urgency: 'medium',
    status: 'accepted',
    amount: 75,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Maya Rodriguez',
    type: 'essentials',
    title: 'Winter Clothing',
    description: 'Moving from a warm climate and need help with winter clothing for the cold season.',
    urgency: 'low',
    status: 'fulfilled',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    items: ['Winter jacket', 'Warm boots', 'Gloves', 'Thermal wear'],
  },
];

export const Requests = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'fulfilled'>('all');

  const filteredRequests = mockRequests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const getStatusConfig = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'bg-amber-100 text-amber-800', label: 'Pending' };
      case 'accepted':
        return { icon: AlertCircle, color: 'bg-blue-100 text-blue-800', label: 'Accepted' };
      case 'fulfilled':
        return { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Fulfilled' };
    }
  };

  const getTypeConfig = (type: Request['type']) => {
    switch (type) {
      case 'food':
        return { color: 'bg-emerald-100 text-emerald-800', label: 'Food' };
      case 'money':
        return { color: 'bg-blue-100 text-blue-800', label: 'Financial Aid' };
      case 'essentials':
        return { color: 'bg-purple-100 text-purple-800', label: 'Essentials' };
    }
  };

  if (user?.role !== 'student') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">This page is only available for students.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
            <p className="text-gray-600">Manage and track your assistance requests</p>
          </div>
          <Button 
            onClick={() => setShowRequestModal(true)}
            className="mt-4 sm:mt-0"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Request
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {['all', 'pending', 'accepted', 'fulfilled'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors KSH{
                  filter === filterType
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const typeConfig = getTypeConfig(request.type);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium KSH{typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center KSH{statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </span>
                      {request.urgency === 'high' && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {request.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    
                    {request.items && request.items.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Items needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {request.items.map((item, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {request.amount && (
                      <p className="text-lg font-semibold text-primary-600">
                        KSH{request.amount} needed
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500 mb-2 sm:mb-0">
                    Created {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-rose-600 border-rose-200">
                          Cancel
                        </Button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <Button size="sm">
                        Contact Donor
                      </Button>
                    )}
                    {request.status === 'fulfilled' && (
                      <Button variant="outline" size="sm">
                        Thank Donor
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredRequests.length === 0 && (
            <Card className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't created any requests yet."
                  : `No KSH{filter} requests found.`
                }
              </p>
              {filter === 'all' && (
                <Button onClick={() => setShowRequestModal(true)}>
                  Create Your First Request
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>

      {showRequestModal && (
        <RequestFormModal onClose={() => setShowRequestModal(false)} />
      )}
    </div>
  );
};