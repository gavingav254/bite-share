// src/pages/Home.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DonorDashboard } from '../components/dashboard/DonorDashboard';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';

export const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'donor' ? <DonorDashboard /> : <StudentDashboard />}
    </div>
  );
};