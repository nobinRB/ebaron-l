'use client';

import { countries } from '@/utils/countries';
import { ValidationError } from '@/utils/validation';
import { getCitySuggestions, getStateFromCity, getLocationFromPincode } from '@/utils/indianLocations';
import { useState } from 'react';

interface BillingAddressFormProps {
  formData: {
    billingName: string;
    billingEmail: string;
    billingPhone: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingPincode: string;
    billingCountry: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  getInputClassName: (fieldName: string) => string;
  errors: ValidationError;
  touched: { [key: string]: boolean };
}

export default function BillingAddressForm({ 
  formData, 
  handleChange, 
  handleBlur,
  getInputClassName,
  errors,
  touched 
}: BillingAddressFormProps) {
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    
    if (formData.billingCountry === 'IN') {
      const suggestions = getCitySuggestions(e.target.value);
      setCitySuggestions(suggestions);
      setShowSuggestions(true);
    }
  };

  const handleCitySelect = (city: string) => {
    const state = getStateFromCity(city);
    
    // Simulate change events for both city and state
    const cityEvent = {
      target: { name: 'billingCity', value: city }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(cityEvent);
    
    if (state) {
      const stateEvent = {
        target: { name: 'billingState', value: state }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleChange(stateEvent);
    }
    
    setShowSuggestions(false);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    
    const { value } = e.target;
    if (formData.billingCountry === 'IN' && value.length === 6) {
      const location = getLocationFromPincode(value);
      if (location) {
        // Simulate change events for city and state
        const cityEvent = {
          target: { name: 'billingCity', value: location.city }
        } as React.ChangeEvent<HTMLInputElement>;
        
        const stateEvent = {
          target: { name: 'billingState', value: location.state }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleChange(cityEvent);
        handleChange(stateEvent);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Billing Address</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="billingName"
            value={formData.billingName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('billingName')}
            required
          />
          {touched.billingName && errors.billingName && (
            <div className="text-sm text-red-500">{errors.billingName}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="billingEmail"
            value={formData.billingEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('billingEmail')}
            required
          />
          {touched.billingEmail && errors.billingEmail && (
            <div className="text-sm text-red-500">{errors.billingEmail}</div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="billingPhone"
            value={formData.billingPhone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('billingPhone')}
            required
          />
          {touched.billingPhone && errors.billingPhone && (
            <div className="text-sm text-red-500">{errors.billingPhone}</div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            className={getInputClassName('billingAddress')}
            required
          />
          {touched.billingAddress && errors.billingAddress && (
            <div className="text-sm text-red-500">{errors.billingAddress}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="billingCountry"
            value={formData.billingCountry}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('billingCountry')}
            required
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {touched.billingCountry && errors.billingCountry && (
            <div className="text-sm text-red-500">{errors.billingCountry}</div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="billingCity"
            value={formData.billingCity}
            onChange={handleCityInputChange}
            onBlur={(e) => {
              setTimeout(() => setShowSuggestions(false), 200);
              handleBlur(e);
            }}
            className={getInputClassName('billingCity')}
            required
          />
          {showSuggestions && formData.billingCountry === 'IN' && citySuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
              {citySuggestions.map((city) => (
                <li
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
          {touched.billingCity && errors.billingCity && (
            <div className="text-sm text-red-500">{errors.billingCity}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="billingState"
            value={formData.billingState}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('billingState')}
            required
            readOnly={formData.billingCountry === 'IN'}
          />
          {touched.billingState && errors.billingState && (
            <div className="text-sm text-red-500">{errors.billingState}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            name="billingPincode"
            value={formData.billingPincode}
            onChange={handlePincodeChange}
            onBlur={handleBlur}
            className={getInputClassName('billingPincode')}
            maxLength={6}
            required
          />
          {touched.billingPincode && errors.billingPincode && (
            <div className="text-sm text-red-500">{errors.billingPincode}</div>
          )}
        </div>
      </div>
    </div>
  );
}