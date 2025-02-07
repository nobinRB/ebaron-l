'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log('Register:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...formik.getFieldProps('name')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
            formik.touched.name && formik.errors.name ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...formik.getFieldProps('confirmPassword')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 ${
            formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}