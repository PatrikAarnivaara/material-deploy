/** @format */

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthenticatedUser = {
  username: string | undefined;
  token: string | undefined;
  authenticated: boolean;
};

export type NewPasswordWithEmailToken = {
  password: string;
  resetPasswordToken: string;
};

export type Email = {
  email: string;
};
