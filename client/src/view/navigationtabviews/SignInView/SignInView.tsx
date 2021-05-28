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
} from "./StyledSignIn.styles";

export const SignInView = (): JSX.Element => {
  const [, setAuthenticatedUser] = useContext(UserContext);
  const [userCredentials, setUserCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
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
    event.preventDefault();
    const { data } = await UserAPIService.loginUser(userCredentials);
    localStorage.setItem(LocalStorage.authenticationToken, data.token);

    setAuthenticatedUser({
      id: data.id,
      username: data.username,
      token: data.token,
      authenticated: true,
    });
    history.push(RoutingPath.homeView);
  };

  return (
    <SignInViewWrapper>
      <SignInViewForm onSubmit={(event) => signIn(event)}>
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
