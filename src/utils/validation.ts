export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phone);
};

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^\d{6}$/;  // 6-digit pincode for India
  return pincodeRegex.test(pincode);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export interface ValidationError {
  [key: string]: string;
}

export const validateCheckoutForm = (formData: any) => {
  const errors: ValidationError = {};

  // Shipping validation
  if (!validateRequired(formData.shippingName)) {
    errors.shippingName = 'Name is required';
  }
  if (!validateEmail(formData.shippingEmail)) {
    errors.shippingEmail = 'Invalid email address';
  }
  if (!validatePhone(formData.shippingPhone)) {
    errors.shippingPhone = 'Invalid phone number';
  }
  if (!validateRequired(formData.shippingAddress)) {
    errors.shippingAddress = 'Address is required';
  }
  if (!validateRequired(formData.shippingCity)) {
    errors.shippingCity = 'City is required';
  }
  if (!validateRequired(formData.shippingState)) {
    errors.shippingState = 'State is required';
  }
  if (!validatePincode(formData.shippingPincode)) {
    errors.shippingPincode = 'Invalid pincode';
  }
  if (!validateRequired(formData.shippingCountry)) {
    errors.shippingCountry = 'Country is required';
  }

  // Billing validation
  if (!validateRequired(formData.billingName)) {
    errors.billingName = 'Name is required';
  }
  if (!validateEmail(formData.billingEmail)) {
    errors.billingEmail = 'Invalid email address';
  }
  if (!validatePhone(formData.billingPhone)) {
    errors.billingPhone = 'Invalid phone number';
  }
  if (!validateRequired(formData.billingAddress)) {
    errors.billingAddress = 'Address is required';
  }
  if (!validateRequired(formData.billingCity)) {
    errors.billingCity = 'City is required';
  }
  if (!validateRequired(formData.billingState)) {
    errors.billingState = 'State is required';
  }
  if (!validatePincode(formData.billingPincode)) {
    errors.billingPincode = 'Invalid pincode';
  }
  if (!validateRequired(formData.billingCountry)) {
    errors.billingCountry = 'Country is required';
  }

  return errors;
};
