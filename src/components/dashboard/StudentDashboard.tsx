// src/components/dashboard/StudentDashboard.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navbar } from '../shared/Navbar';
import { QuickStats } from './QuickStats';
import { RequestFormModal } from '../modals/RequestFormModal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Request } from '../../types';

// Mock student requests
const mockStudentRequests: Request[] = [
  {
    id: '1',
    studentId: '2',
    studentName: 'Maya Rodriguez',
    type: 'food',
    title: 'Weekly Groceries',
    description: 'Looking for help with basic groceries for the week.',
    urgency: 'high',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Maya Rodriguez',
    type: 'money',
    title: 'Textbook Funds',
    description: 'Need help purchasing required textbooks.',
    urgency: 'medium',
    status: 'accepted',
    amount: 75,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export const StudentDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requests] = useState<Request[]>(mockStudentRequests);

  const getStatusIcon = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'accepted':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'fulfilled':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hi {user?.name}!
              </h1>
              <p className="text-primary-100 text-lg">
                You have {requests.filter(r => r.status === 'pending').length} active request
                {requests.filter(r => r.status === 'pending').length !== 1 ? 's' : ''} — 
                stay verified to keep visibility.
              </p>
            </div>
            <Button 
              onClick={() => setShowRequestModal(true)}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Request
            </Button>
          </div>
        </Card>

        <QuickStats 
          helpedStudents={0} 
          karmaPoints={user?.karmaPoints || 0} 
          activeRequests={requests.filter(r => r.status === 'pending').length} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Requests */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Requests</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {request.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{request.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center KSH{getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                    {request.amount && (
                      <span className="font-semibold text-primary-600">
                        KSH{request.amount}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Resources & Tips */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Be specific about your needs to get better matches</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Update your request status when fulfilled</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Respond promptly to donor messages</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you're facing an emergency situation, contact campus resources:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Student Support:</span>
                  <span className="font-medium">(555) 123-HELP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Food Pantry:</span>
                  <span className="font-medium">Campus Center 204</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showRequestModal && (
        <RequestFormModal onClose={() => setShowRequestModal(false)} />
      )}
    </div>
  );
};