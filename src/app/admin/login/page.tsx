'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '@/services/authService';
import { setAuthToken } from '@/utils/auth';

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address format'
    ),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export default function AdminLoginPage() {
  const router = useRouter();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response?.token) {
        setAuthToken(response.token);
        // Add a small delay to ensure token is set
        await new Promise(resolve => setTimeout(resolve, 100));
        router.replace('/admin/dashboard');
        return true;
      }
      throw new Error('Login failed');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        setError('');
        setIsLoading(true);
        await handleLogin(values.email, values.password);
      } catch (error: any) {
        setError(error.message);
        // Clear password field on error
        formik.setFieldValue('password', '');
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Admin Portal</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`mt-1 block w-full px-3 py-2 text-black rounded-lg border ${
                formik.touched.email && formik.errors.email 
                  ? 'border-red-500' 
                  : 'border-gray-200'
              } focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className={`mt-1 block w-full px-3 py-2 text-black rounded-lg border ${
                formik.touched.password && formik.errors.password 
                  ? 'border-red-500' 
                  : 'border-gray-200'
              } focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}