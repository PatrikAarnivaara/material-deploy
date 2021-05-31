import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../shared/provider/UserProvider';
/* import { AuthenticatedUser } from '../../../shared/types/AuthenticationProps'
 */
import LocalStorage from '../../../shared/cache/LocalStorage'
import RoutingPath from '../../../routes/RoutingPath';
import styled from 'styled-components';

const ProfileDropdownWrapper = styled.div`
	position: relative;
`;

const Image = styled.img`
	cursor: pointer;
	border-radius: 50%;
`;

const ProfileDropdownContent = styled.div`
	background-color: ${({ theme }) => theme.colors.secondary};
	padding: 12px 16px;
	color: white;
	z-index: 1;
	right: 35%;
	position: absolute;
	box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%);
	animation: growOut 300ms ease-in-out forwards;
	transform-origin: top center;
	span {
		display: flex;
		padding: 10px;
	}
	button {
		cursor: pointer;
		background-color: white;
		border: none;
		border-radius: 3px;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		margin-top: 1rem;
	}

	@keyframes growOut {
		0% {
			transform: scale(0);
		}
		80% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
`;

export const ProfileDropdown: React.FC<any> = ({ authData }) => {
	const history = useHistory();
	/* TODO: add types for ref and event and make handle click outside a hook */
	const node = useRef<any>(null)
	const [show, setShow] = useState<boolean>(false);
	const [, setAuthenticatedUser] = useContext(UserContext);

	const handleClickOutside = (event: any) => {
		if (node.current.contains(event.target)) {
			return;
		} else {
			setShow(!show)
		}
	};

	useEffect(() => {
		if (show) { document.addEventListener("mousedown", handleClickOutside); }
		else { document.removeEventListener("mousedown", handleClickOutside); }
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show]);

	const showMenu = () => {
		setShow(!show);
	};

	const logout = () => {
		localStorage.removeItem(LocalStorage.authenticationToken)
		setAuthenticatedUser(false)
		history.push(RoutingPath.homeView)
	};

	return (
		<ProfileDropdownWrapper ref={node}>
			<Image onClick={showMenu} src={'https://thispersondoesnotexist.com/image'} alt={'AI face'} />
			{show ? (
				<ProfileDropdownContent>
					<span>{authData.username}</span>
					<hr />
					<span onClick={() => history.push(RoutingPath.profileView)}>Profile</span>
					<span onClick={() => history.push(RoutingPath.userAdminView)}>Users</span>
					<span onClick={() => history.push(RoutingPath.equipmentAdminView)}>Equipment(icon)</span>
					<span onClick={logout}>Logout</span>
				</ProfileDropdownContent>
			) : null}
		</ProfileDropdownWrapper>
	);
};
