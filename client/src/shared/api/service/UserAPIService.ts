/** @format */

import http from "../UserAPI";
import { RegisterFormInputs } from "../../types/RegisterFormInputs";
import { LoginCredentials } from "../../types/AuthenticationProps";
import { NewPasswordWithEmailToken } from "../../types/AuthenticationProps";
import { Email } from "../../types/AuthenticationProps";

const getUser = (userId: string) => {
  return http.get(`/user/${userId}`);
};

const getUsers = () => {
  return http.get("/users");
};

const createUser = (userdata?: RegisterFormInputs) => {
  return http.post("/user", userdata);
};
/* TODO: add specific route etc to edit password and username */
/* Make object instead of all parameters */
const editUser = (
  userId: string,
  firstName: string,
  lastName: string,
  schoolclass: string,
  email: string,
  username: string,
  password: string
) => {
  return http.put(`/user/${userId}`, {
    _id: userId,
    firstname: firstName,
    lastname: lastName,
    schoolclass: schoolclass,
    email: email,
    username: username,
    password: password,
  });
};

const deleteUser = (userId: string) => {
  http.delete(`/user/${userId}`);
};

// -> Authentications below <-

const loginUser = (credentials: LoginCredentials) => {
  return http.post("/user/login", credentials);
};

const forgotPassword = (email: Email) => {
  return http.post("/forgotpassword", email);
};

const resetPassword = (newPasswordAndToken: NewPasswordWithEmailToken) => {
  return http.put("/resetpassword", newPasswordAndToken);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
