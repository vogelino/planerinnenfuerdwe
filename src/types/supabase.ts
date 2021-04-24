export interface SignatoryType {
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  confirmedAt: string;
  organisation?: string;
}

export interface AuthenticatedUserType {
  id: string;
  app_metadata: {
    provider?: string;
    [key: string]: unknown;
  };
  user_metadata: {
    [key: string]: unknown;
  };
  aud: string;
  confirmation_sent_at?: string;
  email?: string;
  created_at: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  role?: "maker" | string;
  updated_at?: string;
}
