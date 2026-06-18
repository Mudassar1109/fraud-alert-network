// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test((email || "").trim());
};

// Phone number validation (basic international format)
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test((phone || "").trim());
};

// URL validation
export const isValidURL = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([^\s./?#]+\.[^\s]{2,}|localhost)(:[0-9]+)?(\/[^\s]*)?$/i;
  return urlRegex.test((url || "").trim());
};

// Check if string contains only whitespace
export const isOnlyWhitespace = (str: string): boolean => {
  return !(str || "").trim().length;
};

// Check for suspicious patterns
export const hasSuspiciousContent = (text: string): boolean => {
  const suspiciousPatterns = [
    /<script|<iframe|javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /\x00/,
  ];
  return suspiciousPatterns.some((pattern) => pattern.test(text || ""));
};

// Validate report submission
export interface ValidationErrors {
  reporterName?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  scamType?: string;
  description?: string;
  consent?: string;
}

export const validateReportForm = (formData: {
  reporterName: string;
  phoneNumber: string;
  email: string;
  website: string;
  scamType: string;
  description: string;
  consent: boolean;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Reporter Name validation
  if (isOnlyWhitespace(formData.reporterName)) {
    errors.reporterName = "Reporter name is required.";
  } else if ((formData.reporterName || "").trim().length > 100) {
    errors.reporterName = "Reporter name must be less than 100 characters.";
  } else if (hasSuspiciousContent(formData.reporterName)) {
    errors.reporterName = "Reporter name contains invalid characters.";
  }

  // Phone Number validation
  if (isOnlyWhitespace(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!isValidPhoneNumber(formData.phoneNumber)) {
    errors.phoneNumber = "Please enter a valid phone number.";
  } else if ((formData.phoneNumber || "").trim().length > 20) {
    errors.phoneNumber = "Phone number must be less than 20 characters.";
  }

  // Email validation
  if (isOnlyWhitespace(formData.email)) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  } else if ((formData.email || "").trim().length > 100) {
    errors.email = "Email address must be less than 100 characters.";
  }

  // Website validation
  if (isOnlyWhitespace(formData.website)) {
    errors.website = "Website URL is required.";
  } else if (!isValidURL(formData.website)) {
    errors.website = "Please enter a valid website URL.";
  } else if ((formData.website || "").trim().length > 500) {
    errors.website = "Website URL must be less than 500 characters.";
  }

  // Scam Type validation
  if (isOnlyWhitespace(formData.scamType)) {
    errors.scamType = "Scam type is required.";
  } else if ((formData.scamType || "").trim().length > 50) {
    errors.scamType = "Scam type must be less than 50 characters.";
  }

  // Description validation
  if (isOnlyWhitespace(formData.description)) {
    errors.description = "Description is required.";
  } else if ((formData.description || "").trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  } else if ((formData.description || "").trim().length > 2000) {
    errors.description = "Description must be less than 2000 characters.";
  } else if (hasSuspiciousContent(formData.description)) {
    errors.description = "Description contains invalid content.";
  }

  // Consent validation
  if (!formData.consent) {
    errors.consent = "You must agree to the privacy policy and terms of service.";
  }

  return errors;
};

// Check for duplicate report (client-side check)
export const checkForDuplicates = (
  formData: { phoneNumber: string; website: string },
  existingReports: Array<{ phone_number: string | null; website: string | null }>
): boolean => {
  const normalizedPhone = (formData.phoneNumber || "").trim().toLowerCase();
  const normalizedWebsite = (formData.website || "").trim().toLowerCase();

  return existingReports.some((report) => {
    const reportPhone = (report.phone_number || "").trim().toLowerCase();
    const reportWebsite = (report.website || "").trim().toLowerCase();

    return (
      (normalizedPhone && reportPhone === normalizedPhone) ||
      (normalizedWebsite && reportWebsite === normalizedWebsite)
    );
  });
};
