import { useContext } from 'react';
import { UserContext } from '../../shared/provider/UserProvider';
import { ProfileDropdown } from './profileDropdown/ProfileDropdown';

export const Profile = (): JSX.Element => {
	const [authenticatedUser] = useContext(UserContext);
	return <ProfileDropdown authData={authenticatedUser} />;
};
