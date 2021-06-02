/** @format */

import styled from "styled-components";

export const SignInViewWrapper = styled.div`
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 960px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 60px;
  height: 100vh;
`;

export const SignInViewForm = styled.form`
  width: 300px;
  padding: 20px;
  margin: auto;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto;
  grid-template-areas:
    "label label"
    "inputUser inputUser"
    "inputPassword inputPassword"
    "message message"
    "button button";
  input {
    padding: 10px;
    border: 0;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    padding: 12px 15px;
    margin: 8px 0;
  }
  input[type="text"] {
    grid-area: inputUser;
  }
  input[type="password"] {
    grid-area: inputPassword;
  }
  input[type="submit"] {
    grid-area: button;
    cursor: pointer;
    border: 1px solid #640eb0;
    background-color: #640eb0;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  label {
    grid-area: label;
    justify-self: center;
    text-transform: uppercase;
  }
`;

export const WrongPasswordOrUsernameErrorMessage = styled.div`
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
  grid-area: message;
`;

export const RegisterForgotPasswordWrapper = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  width: 260px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1.5em;
  cursor: pointer;
`;
export const Register = styled.span`
  text-align: left;
`;

export const ForgotPassword = styled.span`
  text-align: right;
`;
