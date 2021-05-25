import { useState, createContext } from 'react';
import { AuthenticatedUser } from '../types/AuthenticationProps'

export const UserContext = createContext<any>(null);

const defaultValues = {
	id: undefined,
	username: undefined,
	token: undefined,
	authenticated: false,
}

export const UserProvider = (props: { children?: React.ReactNode }) => {
	const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(defaultValues)
	console.log(authenticatedUser)
	return (
		<UserContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>{props.children}</UserContext.Provider>
	);
};
