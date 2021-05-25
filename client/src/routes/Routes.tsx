import React, { useContext, useEffect } from 'react';
import { UserContext } from '../shared/provider/UserProvider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MyLoanView } from '../view/navigationtabviews/MyLoanView';
import { EquipmentView } from '../view/navigationtabviews/EquipmentView';
import { EquipmentAdminView } from '../view/profiledropdownviews/EquipmentAdminView'
import { SignInView } from '../view/navigationtabviews/SignInView/SignInView';
import { RegisterUserView } from '../view/navigationtabviews/RegisterUserView'
import { HomeView } from '../view/navigationtabviews/HomeView';
import { ProfileView } from '../view/profiledropdownviews/ProfileView';
import { ItemDetailView } from '../view/navigationtabviews/ItemDetailView'
import { UserAdminView } from '../view/profiledropdownviews/UserAdminView'
import RoutingPath from './RoutingPath';
import UserAPIService from '../shared/api/service/UserAPIService';

export const Routes = (props: { children?: React.ReactChild }) => {
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
	
	const unAuthenticated = (navigateToViewIfAuthenticated: React.FC) => {
		if (authenticatedUser.authenticated) {
			return HomeView;
		} else {
			return navigateToViewIfAuthenticated;
		}
	};

	const authenticated = (navigateToViewIfAuthenticated: React.FC) => {
		if (authenticatedUser.authenticated) {
			return navigateToViewIfAuthenticated;
		} else {
			return SignInView;
		}
	};

	const validateToken = (tokenExp: number) => {
		const currentTime = Math.floor(Date.now() / 1000)
		return (tokenExp >= currentTime)
	}
	
	useEffect(() => {
		const parseJWT = async () => {
			const token = localStorage.getItem('token')
			if (!token) { return }
			const base64Url = token.split('.')[1]
			const base64 = base64Url.replace('-', '+').replace('_', '/')
			const JWT = JSON.parse(window.atob(base64))
			
			if (validateToken(JWT.exp)) {
				// TODO: There has to be a better way to recieve the username? You cannot just do a getUserWithID like this?
				const { data } = await UserAPIService.getUser(JWT.id)
				setAuthenticatedUser({
					id: JWT.id,
					authenticated: true,
					username: data[0].username,
				})
			} else {
				setAuthenticatedUser({
					id: undefined,
					authenticated: false,
					username: undefined
				})
				localStorage.removeItem('token')
			}
		}
		parseJWT()
	}, [setAuthenticatedUser]);
	

	return (
		<BrowserRouter>
			{props.children}
			<Switch>
				<Route exact path={RoutingPath.myLoanView} component={authenticated(MyLoanView)} />
				<Route exact path={RoutingPath.equipmentView} component={authenticated(EquipmentView)} />
				<Route exact path={RoutingPath.signInView} component={unAuthenticated(SignInView)} />
				<Route exact path={RoutingPath.registerUserView} component={RegisterUserView} />
				<Route exact path={RoutingPath.profileView} component={authenticated(ProfileView)} />
				<Route exact path={RoutingPath.itemDetailView} component={authenticated(ItemDetailView)} />
				<Route exact path={RoutingPath.userAdminView} component={authenticated(UserAdminView)} />
				<Route exact path={RoutingPath.equipmentAdminView} component={authenticated(EquipmentAdminView)} />
				<Route component={HomeView} />
			</Switch>
		</BrowserRouter>
	);
};
