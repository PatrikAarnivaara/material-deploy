/** @format */

import { useContext } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import styled from "styled-components";
import UserAPIService from "../../shared/api/service/UserAPIService";
import { RegisterUserFormikView } from "../navigationtabviews/RegisterUserView/RegisterUserFormikView";

export const ProfileViewWrapper = styled.div`
  max-width: 1124px;
  margin: auto;
  height: 100vh;
`;

export const ProfileView = () => {
  const [authenticatedUser] = useContext(UserContext);
  const { username } = authenticatedUser;

  const test = async () => {
    const response = await UserAPIService.getUser("60afe28c414802fec90bfe2a");
    console.log(response.data.username);
  };

  return (
    <ProfileViewWrapper>
      <span>{username}</span>
      <button onClick={() => test()}>TEST</button>
      <RegisterUserFormikView/>
    </ProfileViewWrapper>
  );
};
