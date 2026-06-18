// HTML sanitization - remove potentially dangerous content
export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();
};

// Rate limiting helper (client-side)
const submissionTimes: number[] = [];
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

export const checkRateLimit = (): boolean => {
  const now = Date.now();
  
  // Remove old entries outside the window
  while (submissionTimes.length > 0 && submissionTimes[0] < now - RATE_LIMIT_WINDOW) {
    submissionTimes.shift();
  }
  
  // Check if limit exceeded
  if (submissionTimes.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }
  
  return true;
};

export const recordSubmission = (): void => {
  submissionTimes.push(Date.now());
};

export const getRateLimitResetTime = (): number => {
  if (submissionTimes.length === 0) return 0;
  
  const oldestSubmission = submissionTimes[0];
  const resetTime = oldestSubmission + 60000;
  const now = Date.now();
  
  return Math.max(0, Math.ceil((resetTime - now) / 1000));
};

// XSS protection - encode HTML entities
export const encodeHTML = (text: string): string => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return (text || "").replace(/[&<>"']/g, (char) => map[char]);
};

// Validate data before sending to database
export const validateDataIntegrity = (data: Record<string, any>): boolean => {
  // Check for null/undefined in required fields
  const requiredFields = ["reporter_name", "phone_number", "email", "website", "scam_type", "description"];
  
  for (const field of requiredFields) {
    if (typeof data[field] !== "string" || !data[field].trim().length) {
      return false;
    }
  }
  
  return true;
};

// Generate a simple hash for duplicate detection
export const generateReportHash = (phoneNumber: string, website: string): string => {
  const combined = `${phoneNumber}:${website}`.toLowerCase();
  let hash = 0;
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36);
};

// Verify security headers (client-side check)
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };
};
