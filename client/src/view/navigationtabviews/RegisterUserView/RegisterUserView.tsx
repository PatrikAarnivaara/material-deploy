/** @format */

import { useState } from "react";
/* import { useHistory } from 'react-router-dom'; */
/* import RoutingPath from '../../routes/RoutingPath'; */
import UserAPIService from "../../../shared/api/service/UserAPIService";
import { RegisterUserProps } from "../../../shared/types/RegisterUserProps";
import {
  RegisterWrapper,
  RegisterForm,
  PasswordValidationWrapper,
  PasswordValidationMessage,
} from "./StyledRegisterUserView.styles";

export const RegisterUserView = () => {
  /* const history = useHistory(); */
  const initialState = {
    firstname: "",
    lastname: "",
    schoolclass: "",
    email: "",
    username: "",
    password: "",
  };
  const [newUser, setNewUser] = useState<RegisterUserProps>(initialState);
  const [confirmCreateUser, setConfirmCreateUser] = useState<string>("");

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await UserAPIService.createUser(newUser);
      if (data) {
        setNewUser(initialState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: keyof RegisterUserProps
  ) => {
    setNewUser({
      ...newUser,
      [target]: event.target.value,
    });
  };

  const messageUsername: string = "Must be at least 5 or more characters.";
  const messagePassword: string =
    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.";

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={(event) => registerUser(event)}>
        <input
          type='text'
          placeholder='first name'
          onChange={(event) => handleChange(event, "firstname")}
        />
        <input
          type='text'
          placeholder='last name'
          onChange={(event) => handleChange(event, "lastname")}
        />
        <input
          type='text'
          placeholder='school class'
          onChange={(event) => handleChange(event, "schoolclass")}
        />
        <input
          type='text'
          placeholder='e-mail'
          onChange={(event) => handleChange(event, "email")}
        />
        <input
          type='text'
          placeholder='username'
          autoComplete='username'
          onChange={(event) => handleChange(event, "username")}
          onFocus={() => {
            setConfirmCreateUser(messageUsername);
          }}
          onBlur={() => {
            setConfirmCreateUser("");
          }}
        />
        <input
          type='password'
          placeholder='password'
          autoComplete='new-password'
          onChange={(event) => handleChange(event, "password")}
          onFocus={() => {
            setConfirmCreateUser(messagePassword);
          }}
          onBlur={() => {
            setConfirmCreateUser("");
          }}
        />
        <input type='submit' value='Register' />
      </RegisterForm>
      <PasswordValidationWrapper>
        <PasswordValidationMessage>
          {confirmCreateUser}
        </PasswordValidationMessage>
      </PasswordValidationWrapper>
    </RegisterWrapper>
  );
};
