/** @format */

import { useContext, useState } from "react";
import { UserContext } from "../../../shared/provider/UserProvider";
import { useHistory } from "react-router-dom";
import {
  SignInViewWrapper,
  SignInViewInput,
  RegisterForgotPasswordWrapper,
  Register,
  ForgotPassword,
} from "./StyledSignIn.styles";
import RoutingPath from "../../../routes/RoutingPath";
import UserAPIService from "../../../shared/api/service/UserAPIService";
import LocalStorage from "../../../shared/cache/LocalStorage";
import { LoginCredentials } from "../../../shared/types/AuthenticationProps";

export const SignInView = (): JSX.Element => {
  const initalState: LoginCredentials = { username: "", password: "" };
  const [userCredentials, setUserCredentials] =
    useState<LoginCredentials>(initalState);
  const [, setAuthenticatedUser] = useContext(UserContext);
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

  const signIn = async () => {
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
      <SignInViewInput>
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
        <button onClick={(event) => signIn(event)}>sign in</button>
      </SignInViewInput>
      <RegisterForgotPasswordWrapper>
        <Register onClick={() => history.push(RoutingPath.registerUserView)}>
          Register
        </Register>
        <ForgotPassword>Forgot password?</ForgotPassword>
      </RegisterForgotPasswordWrapper>
    </SignInViewWrapper>
  );
};
