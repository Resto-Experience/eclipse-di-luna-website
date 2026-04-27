// Lightweight validators tailored to our 4 forms. Avoids pulling in a schema lib
// for what is, ultimately, "is this string non-empty / valid email / valid phone?".

export type ValidationError = { field: string; message: string };

export function validateRequired(value: unknown, field: string): ValidationError | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return { field, message: `${field} is required` };
  }
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateEmail(value: unknown, field = 'email'): ValidationError | null {
  if (typeof value !== 'string' || !EMAIL_RE.test(value)) {
    return { field, message: 'Valid email is required' };
  }
  return null;
}

// Allows digits, spaces, dashes, parens, plus sign. 7+ digits total.
export function validatePhone(value: unknown, field = 'phone'): ValidationError | null {
  if (typeof value !== 'string') return { field, message: 'Phone is required' };
  const digits = value.replace(/\D/g, '');
  if (digits.length < 7) return { field, message: 'Valid phone is required' };
  return null;
}

// Up to 5000 chars to prevent abuse but allow legit messages.
export function validateMessage(value: unknown, field = 'message', maxLen = 5000): ValidationError | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return { field, message: `${field} is required` };
  }
  if (value.length > maxLen) return { field, message: `${field} too long` };
  return null;
}

export function collectErrors(...errs: (ValidationError | null)[]): ValidationError[] {
  return errs.filter((e): e is ValidationError => e !== null);
}

// Honeypot: bots fill any field they see. We render a hidden text input named
// `website`. Real users never touch it. If it's non-empty → silent drop.
export function isBot(formData: FormData | Record<string, unknown>): boolean {
  const v =
    formData instanceof FormData
      ? formData.get('website')
      : (formData as Record<string, unknown>).website;
  return typeof v === 'string' && v.trim() !== '';
}
