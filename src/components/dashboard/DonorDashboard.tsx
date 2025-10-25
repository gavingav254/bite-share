// src/components/dashboard/DonorDashboard.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navbar } from '../shared/Navbar';
import { QuickStats } from './QuickStats';
import { FeedCard } from './FeedCard';
import { KarmaBadge } from './KarmaBadge';
import { RequestFormModal } from '../modals/RequestFormModal';
import { DonationModal } from '../modals/DonationModal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Utensils, Coins, Users } from 'lucide-react';
import { Request } from '../../types';

// Mock data - in real app, this would come from API
const mockRequests: Request[] = [
  {
    id: '1',
    studentId: 's1',
    studentName: 'Alex Johnson',
    type: 'food',
    title: 'Weekly Groceries',
    description: 'Looking for help with basic groceries for the week. Would appreciate any support!',
    urgency: 'high',
    status: 'pending',
    createdAt: new Date().toISOString(),
    items: ['Pasta', 'Rice', 'Vegetables', 'Protein'],
  },
  {
    id: '2',
    studentId: 's2',
    studentName: 'Maria Garcia',
    type: 'money',
    title: 'Textbook Funds',
    description: 'Need help purchasing required textbooks for this semester.',
    urgency: 'medium',
    status: 'pending',
    amount: 150,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const DonorDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  const handleDonate = (request: Request) => {
    setSelectedRequest(request);
    setShowDonationModal(true);
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
                Welcome back, {user?.name}!
              </h1>
              <p className="text-primary-100 text-lg">
                You've helped 3 students this week (+15 Karma Points). Keep making a difference!
              </p>
            </div>
            <KarmaBadge points={user?.karmaPoints || 0} />
          </div>
        </Card>

        <QuickStats helpedStudents={12} karmaPoints={user?.karmaPoints || 0} activeRequests={8} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Student Requests</h2>
              <Button variant="outline">
                AI Recommendations
              </Button>
            </div>

            <div className="space-y-4">
              {mockRequests.map((request) => (
                <FeedCard
                  key={request.id}
                  request={request}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <Utensils className="w-4 h-4 mr-2" />
                  Share a Meal
                </Button>
                <Button className="w-full justify-start">
                  <Coins className="w-4 h-4 mr-2" />
                  Share Funds
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  View Leaderboard
                </Button>
              </div>
            </Card>

            {/* Karma Leaderboard Preview */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Top Helpers</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Chen', points: 245 },
                  { name: 'Mike Rodriguez', points: 189 },
                  { name: 'You', points: user?.karmaPoints || 0 },
                ].map((person, index) => (
                  <div key={person.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-xs font-medium text-primary-600">
                        {index + 1}
                      </div>
                      <span className={person.name === 'You' ? 'font-semibold text-primary-600' : 'text-gray-700'}>
                        {person.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{person.points} pts</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showDonationModal && selectedRequest && (
        <DonationModal
          request={selectedRequest}
          onClose={() => {
            setShowDonationModal(false);
            setSelectedRequest(null);
          }}
          onConfirm={(amount, message) => {
            console.log('Donation:', { amount, message, request: selectedRequest });
            setShowDonationModal(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
};