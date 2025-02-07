'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginFormProps {
  onForgotPassword: () => void;
}

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log('Login:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps('password')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            {...formik.getFieldProps('rememberMe')}
            className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-200"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <button 
          type="button" 
          onClick={onForgotPassword}
          className="text-sm text-gray-600 hover:text-gray-900 hover:underline focus:outline-none"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Logging in...</span>
          </div>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}