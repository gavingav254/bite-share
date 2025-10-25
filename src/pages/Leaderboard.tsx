// src/pages/Leaderboard.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navbar } from '../components/shared/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, Star, Medal, Zap, ArrowUp } from 'lucide-react';

// Mock leaderboard data
const leaderboardData = [
  { id: 1, name: 'Sarah Chen', role: 'donor', points: 245, weeklyChange: +12 },
  { id: 2, name: 'Mike Rodriguez', role: 'donor', points: 189, weeklyChange: +8 },
  { id: 3, name: 'You', role: 'donor', points: 156, weeklyChange: +15 },
  { id: 4, name: 'Emily Watson', role: 'donor', points: 142, weeklyChange: +5 },
  { id: 5, name: 'James Wilson', role: 'donor', points: 128, weeklyChange: +3 },
  { id: 6, name: 'Lisa Park', role: 'donor', points: 115, weeklyChange: +7 },
  { id: 7, name: 'Alex Thompson', role: 'donor', points: 98, weeklyChange: +10 },
  { id: 8, name: 'Maria Garcia', role: 'donor', points: 87, weeklyChange: +4 },
  { id: 9, name: 'David Kim', role: 'donor', points: 76, weeklyChange: +6 },
  { id: 10, name: 'Jessica Brown', role: 'donor', points: 65, weeklyChange: +2 },
];

export const Leaderboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-amber-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-500" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-700" />;
      default:
        return <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-primary-600">{rank}</span>
        </div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Karma Leaderboard</h1>
          <p className="text-gray-600 text-lg">
            Celebrating our most generous community members
          </p>
        </div>

        {/* Current User Stats */}
        {user && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100">Your Current Rank</p>
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold">
                    #{leaderboardData.find(u => u.name === 'You')?.id || 'N/A'}
                  </h2>
                  <div className="flex items-center text-amber-300">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1 font-semibold">
                      {user.karmaPoints || 0} points
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="bg-white text-primary-600 hover:bg-gray-100">
                <Zap className="w-4 h-4 mr-2" />
                Share Achievement
              </Button>
            </div>
          </Card>
        )}

        {/* Leaderboard */}
        <Card className="p-6">
          <div className="space-y-3">
            {leaderboardData.map((person, index) => (
              <div
                key={person.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all KSH{
                  person.name === 'You'
                    ? 'bg-primary-50 border-2 border-primary-200 shadow-sm'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary-600 text-sm">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-semibold KSH{
                      person.name === 'You' ? 'text-primary-600' : 'text-gray-900'
                    }`}>
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{person.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="font-bold text-gray-900">{person.points}</span>
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUp className="w-3 h-3" />
                        <span>{person.weeklyChange}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Karma Points</p>
                  </div>
                  
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* How it works */}
        <Card className="p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">How Karma Points Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-medium text-gray-900">Food Donation</p>
              <p className="text-gray-600">+10 points per meal</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">Financial Support</p>
              <p className="text-gray-600">+1 point per KSH1 donated</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-medium text-gray-900">Essentials</p>
              <p className="text-gray-600">+15 points per package</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};