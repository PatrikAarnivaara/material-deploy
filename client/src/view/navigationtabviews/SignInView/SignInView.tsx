/** @format */

import { useContext, useState } from "react";
import { UserContext } from "../../../shared/provider/UserProvider";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../../routes/RoutingPath";
import UserAPIService from "../../../shared/api/service/UserAPIService";
import LocalStorage from "../../../shared/cache/LocalStorage";
import { LoginCredentials } from "../../../shared/types/AuthenticationProps";
import {
  SignInViewWrapper,
  SignInViewForm,
  RegisterForgotPasswordWrapper,
  Register,
  ForgotPassword,
  WrongPasswordOrUsernameErrorMessage,
} from "./StyledSignIn.styles";

export const SignInView = (): JSX.Element => {
  const [, setAuthenticatedUser] = useContext(UserContext);
  const [userCredentials, setUserCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const history = useHistory();

  const handleUserCredentials = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: keyof LoginCredentials
  ) => {
    setUserCredentials({
      ...userCredentials,
      [target]: event.target.value,
    });
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { data } = await UserAPIService.loginUser(userCredentials);

      localStorage.setItem(LocalStorage.authenticationToken, data.token);
      setErrorMessage(false);

      setAuthenticatedUser({
        id: data.id,
        username: data.username,
        token: data.token,
        authenticated: true,
      });

      history.push(RoutingPath.homeView);
    } catch (error) {
      console.log(error);
      setErrorMessage(true);
    }
  };

  return (
    <SignInViewWrapper>
      <SignInViewForm onSubmit={(event) => signIn(event)}>
        <label>sign in</label>
        <input
          type='text'
          placeholder='username'
          onChange={(event) => handleUserCredentials(event, "username")}
        />
        <input
          type='password'
          autoComplete='current-password'
          placeholder='password'
          onChange={(event) => handleUserCredentials(event, "password")}
        />
        {errorMessage && (
          <WrongPasswordOrUsernameErrorMessage>
            Wrong username or password
          </WrongPasswordOrUsernameErrorMessage>
        )}
        <input type='submit' value='Sign in' />
      </SignInViewForm>
      <RegisterForgotPasswordWrapper>
        <Register onClick={() => history.push(RoutingPath.registerUserView)}>
          Register
        </Register>
        <ForgotPassword>Forgot password?</ForgotPassword>
      </RegisterForgotPasswordWrapper>
    </SignInViewWrapper>
  );
};
