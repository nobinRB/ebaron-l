'use client';

import { useState } from 'react';
import BillingAddressForm from './BillingAddressForm';
import { FaCreditCard } from 'react-icons/fa6';
import { BiMoney } from 'react-icons/bi';
import { countries } from '@/utils/countries';
import { validateCheckoutForm, ValidationError } from '@/utils/validation';
import { getCitySuggestions, getStateFromCity, getLocationFromPincode } from '@/utils/indianLocations';

interface CheckoutFormData {
  // Shipping details
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  shippingCountry: string;
  // Billing details
  billingName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPincode: string;
  billingCountry: string;
  // Payment details
  paymentMethod: 'cod' | 'razorpay';
}

export default function CheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    // Shipping details
    shippingName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    shippingCountry: 'IN',
    // Billing details
    billingName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    billingCountry: 'IN',
    // Payment method
    paymentMethod: 'cod',
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [errors, setErrors] = useState<ValidationError>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const validateField = (name: string, value: string) => {
    const tempFormData = { ...formData, [name]: value };
    const validationErrors = validateCheckoutForm(tempFormData);
    setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof CheckoutFormData]);
  };

  const handleSameAsShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    
    if (checked) {
      const newFormData = {
        ...formData,
        billingName: formData.shippingName,
        billingEmail: formData.shippingEmail,
        billingPhone: formData.shippingPhone,
        billingAddress: formData.shippingAddress,
        billingCity: formData.shippingCity,
        billingState: formData.shippingState,
        billingPincode: formData.shippingPincode,
        billingCountry: formData.shippingCountry,
      };
      setFormData(newFormData);
      const validationErrors = validateCheckoutForm(newFormData);
      setErrors(validationErrors);
    }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'paymentMethod') {
        const paymentValue = value as string;
        if (paymentValue !== 'cod' && paymentValue !== 'razorpay') {
          return prev;
        }
        return { ...prev, [name]: paymentValue };
      }

      const newState = { ...prev, [name]: value };
      
      if (sameAsShipping) {
        const billingField = name.replace('shipping', 'billing') as keyof CheckoutFormData;
        newState[billingField] = value;
      }
      
      return newState;
    });
    validateField(name, value);
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => {
    const { value } = e.target;
    const fieldPrefix = type === 'shipping' ? 'shipping' : 'billing';
    
    setFormData(prev => ({
      ...prev,
      [`${fieldPrefix}City`]: value
    }));

    if (formData[`${fieldPrefix}Country` as keyof CheckoutFormData] === 'IN') {
      const suggestions = getCitySuggestions(value);
      setCitySuggestions(suggestions);
      setShowSuggestions(true);
    }
  };

  const handleCitySelect = (city: string, type: 'shipping' | 'billing') => {
    const fieldPrefix = type === 'shipping' ? 'shipping' : 'billing';
    const state = getStateFromCity(city);
    
    setFormData(prev => ({
      ...prev,
      [`${fieldPrefix}City`]: city,
      [`${fieldPrefix}State`]: state || prev[`${fieldPrefix}State`]
    }));
    
    if (sameAsShipping && type === 'shipping') {
      setFormData(prev => ({
        ...prev,
        billingCity: city,
        billingState: state || prev.billingState
      }));
    }
    
    setShowSuggestions(false);
    validateField(`${fieldPrefix}City`, city);
    if (state) {
      validateField(`${fieldPrefix}State`, state);
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => {
    const { value } = e.target;
    const fieldPrefix = type === 'shipping' ? 'shipping' : 'billing';
    
    setFormData(prev => ({
      ...prev,
      [`${fieldPrefix}Pincode`]: value
    }));

    // Auto-populate city and state for Indian addresses
    if (formData[`${fieldPrefix}Country` as keyof CheckoutFormData] === 'IN' && value.length === 6) {
      const location = getLocationFromPincode(value);
      if (location) {
        const newFormData = {
          ...formData,
          [`${fieldPrefix}City`]: location.city,
          [`${fieldPrefix}State`]: location.state,
          [`${fieldPrefix}Pincode`]: value
        };
        
        if (sameAsShipping && type === 'shipping') {
          newFormData.billingCity = location.city;
          newFormData.billingState = location.state;
          newFormData.billingPincode = value;
        }
        
        setFormData(newFormData);
        validateField(`${fieldPrefix}City`, location.city);
        validateField(`${fieldPrefix}State`, location.state);
        validateField(`${fieldPrefix}Pincode`, value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    // If there are any errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Proceed with form submission
    try {
      // Your form submission logic here
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black";
    const errorClasses = touched[fieldName] && errors[fieldName] 
      ? "border-red-500 focus:ring-red-200" 
      : "border-gray-300 focus:ring-gray-200";
    return `${baseClasses} ${errorClasses}`;
  };

  const handleRazorpayPayment = async () => {
    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 50000, // amount in smallest currency unit (paise for INR)
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        handler: function(response: any) {
          console.log("Payment Success:", response);
          // Handle successful payment
        },
        prefill: {
          name: formData.shippingName,
          email: formData.shippingEmail,
          contact: formData.shippingPhone
        },
        theme: {
          color: "#111827" // matches bg-gray-900
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handlePaymentMethodChange = (method: 'cod' | 'razorpay') => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Address Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="shippingName"
              value={formData.shippingName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('shippingName')}
              required
            />
            {touched.shippingName && errors.shippingName && (
              <div className="text-sm text-red-500">{errors.shippingName}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="shippingEmail"
              value={formData.shippingEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('shippingEmail')}
              required
            />
            {touched.shippingEmail && errors.shippingEmail && (
              <div className="text-sm text-red-500">{errors.shippingEmail}</div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="shippingPhone"
              value={formData.shippingPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('shippingPhone')}
              required
            />
            {touched.shippingPhone && errors.shippingPhone && (
              <div className="text-sm text-red-500">{errors.shippingPhone}</div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={getInputClassName('shippingAddress')}
              required
            />
            {touched.shippingAddress && errors.shippingAddress && (
              <div className="text-sm text-red-500">{errors.shippingAddress}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              name="shippingCountry"
              value={formData.shippingCountry}
              onChange={handleShippingChange}
              className={getInputClassName('shippingCountry')}
              required
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {touched.shippingCountry && errors.shippingCountry && (
              <div className="text-sm text-red-500">{errors.shippingCountry}</div>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={(e) => handleCityInputChange(e, 'shipping')}
              onBlur={(e) => {
                setTimeout(() => setShowSuggestions(false), 200);
                handleBlur(e);
              }}
              className={getInputClassName('shippingCity')}
              required
            />
            {showSuggestions && formData.shippingCountry === 'IN' && citySuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {citySuggestions.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => handleCitySelect(city, 'shipping')}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
            {touched.shippingCity && errors.shippingCity && (
              <div className="text-sm text-red-500">{errors.shippingCity}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              name="shippingState"
              value={formData.shippingState}
              onChange={handleShippingChange}
              onBlur={handleBlur}
              className={getInputClassName('shippingState')}
              required
              readOnly={formData.shippingCountry === 'IN'}
            />
            {touched.shippingState && errors.shippingState && (
              <div className="text-sm text-red-500">{errors.shippingState}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code
            </label>
            <input
              type="text"
              name="shippingPincode"
              value={formData.shippingPincode}
              onChange={(e) => handlePincodeChange(e, 'shipping')}
              onBlur={handleBlur}
              className={getInputClassName('shippingPincode')}
              maxLength={6}
              required
            />
            {touched.shippingPincode && errors.shippingPincode && (
              <div className="text-sm text-red-500">{errors.shippingPincode}</div>
            )}
          </div>
        </div>
      </div>

      {/* Same as Shipping Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sameAsShipping"
          checked={sameAsShipping}
          onChange={handleSameAsShippingChange}
          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
        />
        <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
          Billing address same as shipping
        </label>
      </div>

      {/* Billing Address Section */}
      {!sameAsShipping && (
        <BillingAddressForm 
          formData={formData}
          handleChange={handleChange}
          handleBlur={handleBlur}
          getInputClassName={getInputClassName}
          errors={errors}
          touched={touched}
        />
      )}

      {/* Payment Method Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* COD Option */}
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('cod')}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              formData.paymentMethod === 'cod'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <BiMoney className="w-6 h-6 text-gray-700" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Cash on Delivery</div>
                <div className="text-sm text-gray-500">Extra ₹49 COD charges</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              formData.paymentMethod === 'cod'
                ? 'border-gray-900 bg-gray-900'
                : 'border-gray-300'
            }`} />
          </button>

          {/* Razorpay Option */}
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('razorpay')}
            className={`flex items-center justify-between p-4 border rounded-lg ${
              formData.paymentMethod === 'razorpay'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <FaCreditCard className="w-6 h-6 text-gray-700" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Pay Online</div>
                <div className="text-sm text-gray-500">Cards, UPI, NetBanking</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              formData.paymentMethod === 'razorpay'
                ? 'border-gray-900 bg-gray-900'
                : 'border-gray-300'
            }`} />
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
      >
        {formData.paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Pay'}
      </button>
    </form>
  );
}