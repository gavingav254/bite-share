// src/pages/LandingPage.tsx
import { Button } from '../components/ui/Button';
import { Heart, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-500" />
            <span className="text-2xl font-bold text-gray-900">BiteShare</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth/login')}
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Share a Meal, 
            <span className="text-primary-500"> Share Hope</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect donors with university students in need. Together, we're building a community 
            where everyone has access to food, essentials, and support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/auth/signup', { state: { role: 'donor' } })}
            >
              <Users className="w-5 h-5 mr-2" />
              I Want to Share
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/auth/signup', { state: { role: 'student' } })}
            >
              <Star className="w-5 h-5 mr-2" />
              I Need Help
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">500+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">1,200+</div>
              <div className="text-gray-600">Meals Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">15K+</div>
              <div className="text-gray-600">Karma Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};