// src/pages/Onboarding.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/slices/authSlice';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Upload, BookOpen, Utensils, Coins, ShoppingBag } from 'lucide-react';

export const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [studentId, setStudentId] = useState('');

  const donorPreferences = [
    { id: 'food', label: 'Share Meals', icon: Utensils, description: 'Provide food or groceries' },
    { id: 'money', label: 'Financial Support', icon: Coins, description: 'Offer monetary assistance' },
    { id: 'essentials', label: 'Essential Items', icon: ShoppingBag, description: 'Donate household items' },
  ];

  const handleDonorPreferenceToggle = (preferenceId: string) => {
    setPreferences(prev =>
      prev.includes(preferenceId)
        ? prev.filter(p => p !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user with student ID
    const updatedUser = { ...user!, studentId, karmaPoints: 0 };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(setUser(updatedUser));
    navigate('/home');
  };

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user with preferences
    const updatedUser = { ...user!, preferences, karmaPoints: 0 };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(setUser(updatedUser));
    navigate('/home');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            {user.role === 'student' 
              ? 'Verify your student status to start receiving support'
              : 'Tell us how you\'d like to help students in need'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium KSH{
              step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div 
                className={`h-full transition-all duration-300 KSH{
                  step >= 2 ? 'bg-primary-500' : 'bg-gray-200'
                }`} 
                style={{ width: step >= 2 ? '100%' : '0%' }}
              />
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium KSH{
              step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {user.role === 'student' ? (
          <form onSubmit={handleStudentSubmit} className="space-y-6">
            {step === 1 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Student Verification
                </h2>
                <p className="text-gray-600 mb-6">
                  To ensure resources reach those who need them most, we require student verification.
                </p>
                <Button onClick={() => setStep(2)}>
                  Continue to Verification
                </Button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Upload Student ID
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID Number
                    </label>
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your student ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload ID Photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Your information is kept secure and only used for verification purposes. 
                      You can start using BiteShare immediately while we verify your documents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Complete Setup
                  </Button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleDonorSubmit}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                How would you like to help?
              </h2>
              <p className="text-gray-600">
                Choose one or more ways you'd like to support students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {donorPreferences.map((pref) => {
                const Icon = pref.icon;
                const isSelected = preferences.includes(pref.id);
                
                return (
                  <div
                    key={pref.id}
                    onClick={() => handleDonorPreferenceToggle(pref.id)}
                    className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 KSH{
                      isSelected
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 KSH{
                      isSelected ? 'bg-primary-500' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 KSH{isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{pref.label}</h3>
                    <p className="text-sm text-gray-600">{pref.description}</p>
                  </div>
                );
              })}
            </div>

            <Button type="submit" className="w-full" disabled={preferences.length === 0}>
              Start Helping
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};