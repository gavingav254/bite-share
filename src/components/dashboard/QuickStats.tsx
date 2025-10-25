// src/components/dashboard/QuickStats.tsx
import { Card } from '../ui/Card';
import { Users, Heart, Star } from 'lucide-react';

interface QuickStatsProps {
  helpedStudents: number;
  karmaPoints: number;
  activeRequests: number;
}

export const QuickStats = ({ helpedStudents, karmaPoints, activeRequests }: QuickStatsProps) => {
  const stats = [
    {
      label: 'Students Helped',
      value: helpedStudents,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Karma Points',
      value: karmaPoints,
      icon: Star,
      color: 'text-amber-500',
    },
    {
      label: 'Active Requests',
      value: activeRequests,
      icon: Heart,
      color: 'text-rose-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gray-50 KSH{stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};