// src/pages/Donations.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navbar } from '../components/shared/Navbar';
import { DonationModal } from '../components/modals/DonationModal';
import { FeedCard } from '../components/dashboard/FeedCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Filter, Search, History } from 'lucide-react';
import { Request, Donation } from '../types';

// Mock data
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
  {
    id: '3',
    studentId: 's3',
    studentName: 'David Kim',
    type: 'essentials',
    title: 'Winter Essentials',
    description: 'Recently moved from a warmer climate and need help with winter clothing.',
    urgency: 'low',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    items: ['Winter jacket', 'Boots', 'Gloves'],
  },
];

const mockDonations: Donation[] = [
  {
    id: 'd1',
    donorId: '1',
    requestId: '1',
    amount: 50,
    message: 'Hope this helps with your groceries!',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'd2',
    donorId: '1',
    requestId: '2',
    amount: 25,
    message: 'For your textbooks!',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

export const Donations = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'history'>('browse');
  const [filter, setFilter] = useState<'all' | 'food' | 'money' | 'essentials'>('all');

  const filteredRequests = mockRequests.filter(request => 
    filter === 'all' || request.type === filter
  );

  const handleDonate = (request: Request) => {
    setSelectedRequest(request);
    setShowDonationModal(true);
  };

  if (user?.role !== 'donor') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">This page is only available for donors.</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Difference</h1>
            <p className="text-gray-600">Browse student requests and provide support</p>
          </div>
        </div>

        {/* Tabs */}
        <Card className="p-1 mb-6 inline-flex">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors KSH{
              activeTab === 'browse'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Browse Requests
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors KSH{
              activeTab === 'history'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History className="w-4 h-4 inline mr-2" />
            Donation History
          </button>
        </Card>

        {activeTab === 'browse' && (
          <>
            {/* Filters */}
            <Card className="p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center text-gray-700">
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Filter by type:</span>
                </div>
                {['all', 'food', 'money', 'essentials'].map((filterType) => (
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

            {/* Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <FeedCard
                  key={request.id}
                  request={request}
                  onDonate={handleDonate}
                />
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <Card className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more requests.</p>
              </Card>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {mockDonations.map((donation) => {
              const request = mockRequests.find(r => r.id === donation.requestId);
              return (
                <Card key={donation.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {request?.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{request?.studentName}</p>
                      <p className="text-primary-600 font-semibold text-lg">
                        KSH{donation.amount} donated
                      </p>
                      {donation.message && (
                        <p className="text-gray-600 mt-2 italic">"{donation.message}"</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium KSH{
                      request?.type === 'food' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : request?.type === 'money'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {request?.type}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              );
            })}

            {mockDonations.length === 0 && (
              <Card className="p-8 text-center">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No donation history</h3>
                <p className="text-gray-600 mb-4">Your generous donations will appear here.</p>
                <Button onClick={() => setActiveTab('browse')}>
                  Browse Requests
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>

      {showDonationModal && selectedRequest && (
        <DonationModal
          request={selectedRequest}
          onClose={() => {
            setShowDonationModal(false);
            setSelectedRequest(null);
          }}
          onConfirm={(amount, message) => {
            console.log('Donation confirmed:', { amount, message, request: selectedRequest });
            setShowDonationModal(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
};