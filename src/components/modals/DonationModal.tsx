// src/components/modals/DonationModal.tsx
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Heart } from 'lucide-react';
import { Request } from '../../types';

interface DonationModalProps {
  request: Request;
  onClose: () => void;
  onConfirm: (amount: number, message: string) => void;
}

export const DonationModal = ({ request, onClose, onConfirm }: DonationModalProps) => {
  const [amount, setAmount] = useState(request.amount ? request.amount.toString() : '');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(Number(amount), message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Make a Donation</h3>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">{request.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{request.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Heart className="w-4 h-4 mr-1" />
            Requested by {request.studentName}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (KSH)
            </label>
            <input
              type="number"
              required
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add an encouraging message..."
            />
          </div>

          <Button type="submit" className="w-full">
            Confirm Donation
          </Button>
        </form>
      </Card>
    </div>
  );
};