'use client';

export const AUTH_TOKEN_NAME = 'token';

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_NAME);
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_NAME, token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_NAME);
  }
};

export const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};