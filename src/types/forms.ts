export type FormStatus = 'idle' | 'pending' | 'success' | 'error';

export interface FormState {
  status: FormStatus;
  message?: string;
  errors?: Record<string, string[]>;
}
