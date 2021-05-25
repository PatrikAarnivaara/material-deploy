import { useHistory } from 'react-router-dom';
import { UserContext } from '../../shared/provider/UserProvider';
import RoutingPath from '../../routes/RoutingPath';
import { useContext } from 'react';
import styled from 'styled-components';


export const HomeViewWrapper = styled.div`
	max-width: 1124px;
	margin: auto;
	height: 100vh;
`

export const Container = styled.section`
	justify-content: center;
	margin: auto;
	max-width: 500px;
	height: auto;
	padding: 2em;
	letter-spacing: 1px;
	line-height: 1.6;
	`

export const ClickableTextLink = styled.span`
	font-weight: 500;
	color: gray;
	cursor:pointer;
	`

export const HomeView = () => {
	const history = useHistory();
	const [authenticatedUser,] = useContext(UserContext);
	const { authenticated } = authenticatedUser
	/* TODO: add text block for admin instructions */

	const signIn = <ClickableTextLink onClick={() => history.push(RoutingPath.signInView)}>Sign in</ClickableTextLink>;
	const myLoans = <ClickableTextLink onClick={() => history.push(RoutingPath.myLoanView)}>My Loans</ClickableTextLink>;
	const equipment = <ClickableTextLink onClick={() => history.push(RoutingPath.equipmentView)}>Equipment</ClickableTextLink>;

	const handleInfoText = () => {
		if (authenticated) {
			return <span>Hej, här kan du låna utrustning! <br /> <br />
				Klicka på {equipment} för att se listan över tillgänglig
				utrustning och låna. Klicka på {myLoans} för att
				se dina lån. Klicka på avataren för att ändra dina inställningar
				och logga ut.</span>

		} else {
			return <span>Tryck på {signIn} för att logga in.</span>
		}
	}

	return (
		<HomeViewWrapper>
			<Container>{handleInfoText()}</Container>
		</HomeViewWrapper>
	);
};