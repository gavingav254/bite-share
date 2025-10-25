// src/components/auth/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Loader2, Shield, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'donor';
  fallbackPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/auth/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // Simulate authentication check delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Checking Authentication</h2>
          <p className="text-gray-600">Please wait while we verify your session...</p>
        </Card>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ 
          from: location,
          message: 'Please sign in to access this page'
        }} 
        replace 
      />
    );
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-rose-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            This page is only available for {requiredRole}s. 
            You are currently signed in as a {user.role}.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
            >
              Go Back
            </Button>
            <Button 
              onClick={() => {
                // Clear current session and redirect to login
                localStorage.removeItem('user');
                window.location.href = '/auth/login';
              }}
              className="w-full"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In as {requiredRole === 'donor' ? 'Donor' : 'Student'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

// Additional specialized protected route components

// Higher-order component for role-based protection
export const withRoleProtection = (
  Component: React.ComponentType,
  requiredRole: 'student' | 'donor'
) => {
  return function RoleProtectedComponent(props: any) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Quick access components for common protection patterns
export const StudentRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="student">
    {children}
  </ProtectedRoute>
);

export const DonorRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="donor">
    {children}
  </ProtectedRoute>
);

// Public route that redirects authenticated users away
interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const PublicRoute = ({ children, redirectPath = '/home' }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  // If user is authenticated, redirect them away from public routes (like login/signup)
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || redirectPath;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};