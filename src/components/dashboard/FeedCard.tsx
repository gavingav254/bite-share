// src/components/dashboard/FeedCard.tsx
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Clock, User, AlertTriangle } from 'lucide-react';
import { Request } from '../../types';

interface FeedCardProps {
  request: Request;
  onDonate: (request: Request) => void;
}

export const FeedCard = ({ request, onDonate }: FeedCardProps) => {
  const urgencyConfig = {
    low: { color: 'bg-green-100 text-green-800', icon: Clock },
    medium: { color: 'bg-amber-100 text-amber-800', icon: Clock },
    high: { color: 'bg-rose-100 text-rose-800', icon: AlertTriangle },
  };

  const typeConfig = {
    food: { color: 'bg-emerald-100 text-emerald-800', label: 'Food' },
    money: { color: 'bg-blue-100 text-blue-800', label: 'Financial Aid' },
    essentials: { color: 'bg-purple-100 text-purple-800', label: 'Essentials' },
  };

  const UrgencyIcon = urgencyConfig[request.urgency].icon;
  const urgencyStyle = urgencyConfig[request.urgency];
  const typeStyle = typeConfig[request.type];

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{request.studentName}</h3>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium KSH{typeStyle.color}`}>
            {typeStyle.label}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center KSH{urgencyStyle.color}`}>
            <UrgencyIcon className="w-3 h-3 mr-1" />
            {request.urgency}
          </span>
        </div>
      </div>

      <h4 className="font-bold text-lg text-gray-900 mb-2">{request.title}</h4>
      <p className="text-gray-600 mb-4">{request.description}</p>

      {request.amount && (
        <p className="text-lg font-semibold text-primary-600 mb-4">
          KSH{request.amount} needed
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
        <Button onClick={() => onDonate(request)}>
          Help Now
        </Button>
      </div>
    </Card>
  );
};