/** @format */

import styled from "styled-components";

export const RegisterWrapper = styled.div`
  max-width: 1124px;
  margin: auto;
  height: 100vh;
`;

export const RegisterForm = styled.form`
  margin: auto;
  display: grid;
  grid-template-columns: auto;
  grid-gap: 0.5em;
  max-width: 400px;

  input {
    padding: 10px;
    border: 0;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    padding: 12px 15px;
    margin: 8px 0;
  }

  input[type="submit"] {
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
    margin-bottom: 20px;
  }
`;

export const PasswordWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  input,
  i {
    grid-row: 1/2;
  }

  input {
    grid-column: 1/6;
    width: 100%;
  }

  i {
    grid-column: 5 / -1;
    align-self: center;
    justify-self: right;
    z-index: 2;
    margin-right: 1em;
    color: ${(props) => props.color};
  }

  i:hover {
    cursor: pointer;
  }

  p {
    grid-column: 1/6;
  }
`;
