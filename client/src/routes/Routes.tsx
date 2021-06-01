import React, { useContext, useEffect } from 'react';
import { UserContext } from '../shared/provider/UserProvider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LocalStorage from '../shared/cache/LocalStorage'
import { MyLoanView } from '../view/navigationtabviews/MyLoanView';
import { EquipmentView } from '../view/navigationtabviews/EquipmentView';
import { EquipmentAdminView } from '../view/profiledropdownviews/EquipmentAdminView'
import { SignInView } from '../view/navigationtabviews/SignInView/SignInView';
import { RegisterUserView } from '../view/navigationtabviews/RegisterUserView/RegisterUserView'
import { HomeView } from '../view/navigationtabviews/HomeView';
import { ProfileView } from '../view/profiledropdownviews/ProfileView';
import { ItemDetailView } from '../view/navigationtabviews/ItemDetailView'
import { UserAdminView } from '../view/profiledropdownviews/UserAdminView'
import RoutingPath from './RoutingPath';
import UserAPIService from '../shared/api/service/UserAPIService';

export const Routes = (props: { children?: React.ReactChild }) => {
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
	
	const blockRouteIfUserIsSignedIn = (navigateToViewIfAuthenticated: React.FC) => {
		return authenticatedUser.authenticated ? HomeView : navigateToViewIfAuthenticated
	};

	const authenticated = (navigateToViewIfAuthenticated: React.FC) => {
		return authenticatedUser.authenticated ? navigateToViewIfAuthenticated : SignInView
	};

	/* const validateToken = (tokenExp: number) => {
		const currentTime = Math.floor(Date.now() / 1000)
		return (tokenExp >= currentTime)
	}
	
	useEffect(() => {
		const parseJWT = async () => {
			const token = localStorage.getItem(LocalStorage.authenticationToken)
			if (!token) { return }
			const base64Url = token.split('.')[1]
			const base64 = base64Url.replace('-', '+').replace('_', '/')
			const JWT = JSON.parse(window.atob(base64))
			
			if (validateToken(JWT.exp)) {
				
				const response = await UserAPIService.getUser(JWT.id)
				console.log(response.data)
				setAuthenticatedUser({
					id: JWT.id,
					authenticated: true,
					username: response.data.username,
				})
			} else {
				setAuthenticatedUser({
					id: undefined,
					authenticated: false,
					username: undefined
				})
				localStorage.removeItem(LocalStorage.authenticationToken)
			}
		}
		parseJWT()
	}, [setAuthenticatedUser]);
	 */

	return (
		<BrowserRouter>
			{props.children}
			<Switch>
				<Route exact path={RoutingPath.myLoanView} component={authenticated(MyLoanView)} />
				<Route exact path={RoutingPath.equipmentView} component={authenticated(EquipmentView)} />
				<Route exact path={RoutingPath.signInView} component={blockRouteIfUserIsSignedIn(SignInView)} />
				<Route exact path={RoutingPath.registerUserView} component={blockRouteIfUserIsSignedIn(RegisterUserView)} />
				<Route exact path={RoutingPath.profileView} component={authenticated(ProfileView)} />
				<Route exact path={RoutingPath.itemDetailView} component={authenticated(ItemDetailView)} />
				<Route exact path={RoutingPath.userAdminView} component={authenticated(UserAdminView)} />
				<Route exact path={RoutingPath.equipmentAdminView} component={authenticated(EquipmentAdminView)} />
				<Route component={HomeView} />
			</Switch>
		</BrowserRouter>
	);
};
