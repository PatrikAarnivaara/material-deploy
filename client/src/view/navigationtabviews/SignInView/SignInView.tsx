import { useContext, useState } from 'react';
import { UserContext } from '../../../shared/provider/UserProvider';
import { useHistory } from 'react-router-dom';
import { SignInViewWrapper, SignInViewInput, RegisterForgotPasswordWrapper, Register, ForgotPassword } from './StyledSignIn.styles';
import RoutingPath from '../../../routes/RoutingPath';
import UserAPIService from '../../../shared/api/service/UserAPIService';
import LocalStorage from '../../../shared/cache/LocalStorage'
import { LoginCredentials } from '../../../shared/types/AuthenticationProps'


export const SignInView = (): JSX.Element => {
	const initalState: LoginCredentials = { username: "", password: "" }
	const [userCredentials, setUserCredentials] = useState<LoginCredentials>(initalState);
	const [, setAuthenticatedUser] = useContext(UserContext);
	const history = useHistory();

	const handleUserCredentials = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setUserCredentials({
			...userCredentials,
			[event.target.name]: value,
		});
	};

	const signIn = async () => {
		const { data } = await UserAPIService.loginUser(userCredentials)
		localStorage.setItem(LocalStorage.authenticationToken, data.token)

		setAuthenticatedUser({
			id: data.id,
			username: data.username,
			token: data.token,
			authenticated: true,
		})
		history.push(RoutingPath.homeView);
	};


	return (
		<SignInViewWrapper>
			<SignInViewInput>
				<input
					type="text"
					autoComplete="username"
					placeholder="Username"
					className="input-user"
					name="username"
					value={userCredentials.username}
					onChange={handleUserCredentials}
				/>
				<input
					type="password"
					autoComplete="current-password"
					placeholder="Password"
					className="input-password"
					name="password"
					value={userCredentials.password}
					onChange={handleUserCredentials}
				/>
				<button onClick={() => signIn()}>sign in</button>
			</SignInViewInput>
			<RegisterForgotPasswordWrapper>
				<Register onClick={() => history.push(RoutingPath.registerUserView)}>Register</Register>
				<ForgotPassword>Forgot password?</ForgotPassword>
			</RegisterForgotPasswordWrapper>
		</SignInViewWrapper>
	);
};
