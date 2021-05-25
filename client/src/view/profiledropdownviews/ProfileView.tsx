import { useContext } from 'react';
import { UserContext } from '../../shared/provider/UserProvider';
import styled from 'styled-components';

export const ProfileViewWrapper = styled.div`
	max-width: 1124px;
	margin:auto;
	height: 100vh;
`

export const ProfileView = () => {
    const [authenticatedUser] = useContext(UserContext);
    const { username } = authenticatedUser
    return (
        <ProfileViewWrapper>
            <span>{username}</span>
        </ProfileViewWrapper>
    )
}
