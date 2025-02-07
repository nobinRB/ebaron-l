'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      console.log('Reset password for:', values.email);
    },
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Forgot Password</h3>
        <p className="text-sm text-gray-600 mt-1">
          Enter your email address to reset your password
        </p>
      </div>

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

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Sending Reset Link...' : 'Reset Password'}
        </button>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full text-sm text-gray-600 hover:text-gray-900"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}