// src/components/dashboard/KarmaBadge.tsx
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface KarmaBadgeProps {
  points: number;
}

export const KarmaBadge = ({ points }: KarmaBadgeProps) => {
  const [displayPoints, setDisplayPoints] = useState(points);

  useEffect(() => {
    // Smooth counting animation
    if (points !== displayPoints) {
      const timer = setTimeout(() => {
        setDisplayPoints(prev => {
          const diff = points - prev;
          return prev + Math.ceil(diff * 0.1);
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [points, displayPoints]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-amber-200">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
        <div>
          <p className="text-sm text-amber-600 font-medium">Karma Points</p>
          <p className="text-2xl font-bold text-amber-700">{displayPoints}</p>
        </div>
      </div>
    </div>
  );
};