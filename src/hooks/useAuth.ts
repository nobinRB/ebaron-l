'use client';

import { useRouter } from 'next/navigation';
import { removeAuthToken, isAuthenticated } from '@/utils/authUtils';

export const useAuth = () => {
  const router = useRouter();

  const logout = () => {
    removeAuthToken();
    router.replace('/admin/login');
  };

  return {
    logout,
    isAuthenticated: isAuthenticated(),
  };
};