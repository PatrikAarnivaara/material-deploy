import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../shared/provider/UserProvider';
import logotype from '../../../shared/images/logotype.svg';
import RoutingPath from '../../../routes/RoutingPath';
import { StyledDesktop } from './StyledDesktop.styles';
import { Profile } from '../../profile/Profile';

export const Desktop = () => {
	const [authenticatedUser] = useContext(UserContext);
	const history = useHistory();
	const { authenticated } = authenticatedUser

	const displaySignedInUser = () => {
		return authenticated ? (
			<Profile />
		) : (
			<span onClick={() => history.push(RoutingPath.signInView)}>sign in</span>
		);
	};

	return (
		<StyledDesktop>
			<header>
				<img onClick={() => history.push(RoutingPath.homeView)} src={logotype} alt="material" />
				<nav>
					<ul>
						<li onClick={() => history.push(RoutingPath.equipmentView)}>equipment</li>
						<li onClick={() => history.push(RoutingPath.myLoanView)}>my loans</li>
					</ul>
				</nav>
				<span>{displaySignedInUser()}</span>
			</header>
		</StyledDesktop>
	);
};
