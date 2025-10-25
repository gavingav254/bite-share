// src/pages/auth/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Eye, EyeOff, ArrowLeft, Heart } from 'lucide-react';
import { setUser } from '../../store/slices/authSlice';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Mock users for demonstration
  const mockUsers = {
    donor: {
      id: '1',
      email: 'donor@example.com',
      password: 'password',
      name: 'Alex Johnson',
      role: 'donor' as const,
      karmaPoints: 45,
    },
    student: {
      id: '2',
      email: 'student@example.com',
      password: 'password',
      name: 'Maya Rodriguez',
      role: 'student' as const,
      karmaPoints: 0,
      studentId: 'STU12345',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would call your backend
    const user = Object.values(mockUsers).find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Remove password before storing
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      dispatch(setUser(userWithoutPassword));
      
      // Redirect based on onboarding status (mock check)
      const needsOnboarding = !user.studentId && user.role === 'student';
      if (needsOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    } else {
      alert('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role: 'donor' | 'student') => {
    const user = mockUsers[role];
    const { password, ...userWithoutPassword } = user;
    setFormData({ email: user.email, password: 'password' });
    
    // Auto-login after a brief delay to show the form filling
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      dispatch(setUser(userWithoutPassword));
      navigate('/home');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-2">
          <Heart className="h-8 w-8 text-primary-500 mr-2" />
          <span className="text-2xl font-bold text-gray-900">BiteShare</span>
        </div>

        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Sign in to your account to continue making a difference in your community.
        </p>

        {/* Demo Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            onClick={() => handleDemoLogin('donor')}
            className="text-sm"
          >
            Demo Donor
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDemoLogin('student')}
            className="text-sm"
          >
            Demo Student
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/auth/signup"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};