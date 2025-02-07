'use client';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function AuthMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<'login' | 'register' | 'forgot'>('login');

  return (
    <div className="relative">
      {/* Auth Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black hover:text-gray-700 transition-colors"
        aria-label="Account menu"
      >
        <FaUser className="w-6 h-6" />
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
            {/* Tab Headers - Only show for login/register */}
            {activeForm !== 'forgot' && (
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 text-sm font-medium transition-colors
                    ${activeForm === 'login' 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveForm('login')}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium transition-colors
                    ${activeForm === 'register' 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveForm('register')}
                >
                  Register
                </button>
              </div>
            )}

            {/* Form Container */}
            <div className="p-6">
              {activeForm === 'login' && <LoginForm onForgotPassword={() => setActiveForm('forgot')} />}
              {activeForm === 'register' && <RegisterForm />}
              {activeForm === 'forgot' && (
                <ForgotPasswordForm onBackToLogin={() => setActiveForm('login')} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 