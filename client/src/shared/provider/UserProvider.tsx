/** @format */

import { useState, createContext } from "react";
import { AuthenticatedUser } from "../types/AuthenticationProps";

export const UserContext = createContext<any>(null);

const defaultValues = {
  id: undefined,
  username: undefined,
  token: undefined,
  authenticated: false,
};

export const UserProvider = (props: { children?: React.ReactChild }) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser>(defaultValues);
  const { children } = props;
  return (
    <UserContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
      {children}
    </UserContext.Provider>
  );
};
